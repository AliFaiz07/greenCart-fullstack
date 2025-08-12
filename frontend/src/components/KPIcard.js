import React from "react";

export default function KPICard({ title, value, positive }) {
  const style = {
    padding: "1rem",
    margin: "0.5rem",
    borderRadius: "8px",
    color: "white",
    backgroundColor: positive ? "#28a745" : "#dc3545",
    minWidth: "150px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };
  return (
    <div style={style}>
      <h4>{title}</h4>
      <p style={{ fontSize: "1.5rem", margin: 0 }}>{value}</p>
    </div>
  );
}
