const MS_PER_MIN = 60 * 1000;

function calculateFuelCost(distanceKm, trafficLevel) {
  const basePerKm = 5;
  const surchargePerKm = trafficLevel && trafficLevel.toLowerCase() === 'high' ? 2 : 0;
  return (basePerKm + surchargePerKm) * distanceKm;
}

function computeOrderOutcome(order, route, driver) {
  const baseTimeMin = Number(route.baseTimeMin);
  let trafficMultiplier = 1;
  const t = (route.trafficLevel || '').toLowerCase();
  if (t === 'high') trafficMultiplier = 1.2;
  else if (t === 'medium') trafficMultiplier = 1.1;

  let speedMultiplier = 1;
  if (driver.past7DayHours && driver.past7DayHours[0] > 8) {
    speedMultiplier = 1 / 0.7;
  }

  const actualTimeMin = baseTimeMin * trafficMultiplier * speedMultiplier;
  const isLate = actualTimeMin > (baseTimeMin + 10);

  return { actualTimeMin, isLate };
}

function runSimulation(inputs, drivers, routes, orders) {
  const { numberOfDrivers } = inputs;

  if (numberOfDrivers > drivers.length) {
    return { error: 'numberOfDrivers exceeds available drivers' };
  }

  const activeDrivers = drivers.slice(0, numberOfDrivers).map(d => ({
    ...d,
    assignedOrders: [],
    totalWorkMinutes: 0
  }));

  const routeMap = new Map(routes.map(r => [r.routeId, r]));
  let driverPointer = 0;
  const perOrderResults = [];

  for (const order of orders) {
    const route = routeMap.get(order.routeId);
    const driver = activeDrivers[driverPointer % activeDrivers.length];
    driverPointer++;

    const { actualTimeMin, isLate } = computeOrderOutcome(order, route, driver);
    const latePenalty = isLate ? 50 : 0;
    const highValueBonus = (order.valueRs > 1000 && !isLate) ? order.valueRs * 0.1 : 0;
    const fuelCost = calculateFuelCost(route.distanceKm, route.trafficLevel);
    const orderProfit = order.valueRs + highValueBonus - latePenalty - fuelCost;

    driver.totalWorkMinutes += actualTimeMin;
    driver.assignedOrders.push(order.orderId);

    perOrderResults.push({
      orderId: order.orderId,
      driverId: driver.id,
      routeId: route.routeId,
      isLate,
      orderProfit,
      fuelCost,
      highValueBonus,
      latePenalty
    });
  }

  const totalProfit = perOrderResults.reduce((sum, o) => sum + o.orderProfit, 0);
  const totalDeliveries = perOrderResults.length;
  const onTime = perOrderResults.filter(o => !o.isLate).length;
  const late = totalDeliveries - onTime;
  const efficiencyScore = totalDeliveries ? (onTime / totalDeliveries) * 100 : 0;

  return {
    summary: { totalProfit, efficiencyScore, totalDeliveries, onTime, late },
    perOrderResults
  };
}

module.exports = { runSimulation };
