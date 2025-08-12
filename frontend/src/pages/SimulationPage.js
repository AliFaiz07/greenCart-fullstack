import React, { useState } from "react";
import KPICard from "../components/KPIcard";
import { FuelCostChart, DeliveryPieChart } from "../components/Charts";
import SimulationForm from "../components/SimulationForm"; // Adjust path if needed

export default function SimulationPage() {
  const [running, setRunning] = useState(false);
  const [lastInput, setLastInput] = useState(null);

  const kpiData = [
    { title: "Total Profit", value: 1425, positive: true },
    { title: "Fuel Cost", value: 145, positive: false },
    { title: "On-Time Deliveries", value: 2, positive: true },
    { title: "Late Deliveries", value: 0, positive: false },
  ];

  const runSimulation = ({ textValue, numberValue }) => {
    setRunning(true);
    setLastInput({ textValue, numberValue });
    console.log("Running simulation with inputs:", textValue, numberValue);

    setTimeout(() => {
      alert(`Simulation complete! Inputs were: Text="${textValue}", Number=${numberValue}`);
      setRunning(false);
    }, 2000);
  };

  // ... same chart and layout styles from before ...

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>GreenCart Logistics Dashboard</h2>

      <SimulationForm running={running} onSubmit={runSimulation} />

      {lastInput && (
        <div style={{ textAlign: "center", marginTop: "1rem", fontStyle: "italic" }}>
          Last input: Text = <b>{lastInput.textValue}</b>, Number = <b>{lastInput.numberValue}</b>
        </div>
      )}

      {/* KPI cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {kpiData.map(({ title, value, positive }) => (
          <KPICard key={title} title={title} value={value} positive={positive} />
        ))}
      </div>

      {/* Charts */}
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        gap: "2rem",
        marginTop: "2rem",
        flexWrap: "wrap",
      }}>
        <div style={{ flex: "1 1 45%", minWidth: "300px" }}>
          <FuelCostChart />
        </div>
        <div style={{ flex: "1 1 45%", minWidth: "300px" }}>
          <DeliveryPieChart />
        </div>
      </div>
    </div>
  );
}
