// src/components/Charts.jsx
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell
} from "recharts";

const fuelCostData = [
  { driver: "Driver 1", cost: 40 },
  { driver: "Driver 2", cost: 55 },
  { driver: "Driver 3", cost: 50 },
  { driver: "Driver 4", cost: 45 },
];

const deliveryData = [
  { name: "On-Time", value: 2 },
  { name: "Late", value: 0 },
];

const COLORS = ["#28a745", "#dc3545"];

export function FuelCostChart() {
  return (
    <BarChart width={400} height={250} data={fuelCostData}>
      <XAxis dataKey="driver" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="cost" fill="#007bff" />
    </BarChart>
  );
}

export function DeliveryPieChart() {
  return (
    <PieChart width={400} height={250}>
      <Pie
        data={deliveryData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {deliveryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
