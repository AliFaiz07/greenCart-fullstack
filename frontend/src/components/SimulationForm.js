import React, { useState } from "react";

function SimulationForm({ running, onSubmit }) {
  // Local state for inputs
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState("");

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    margin: "2rem auto",
    gap: "1rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1.5px solid #ccc",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
  };

  const buttonStyle = {
    padding: "0.6rem 2rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: running ? "#6c757d" : "#007bff",
    color: "white",
    cursor: running ? "not-allowed" : "pointer",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!running) {
      // Pass the input values back to parent component
      onSubmit({ textValue, numberValue });
    }
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a text value"
        style={inputStyle}
        required
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter a number value"
        style={inputStyle}
        required
        value={numberValue}
        onChange={(e) => setNumberValue(e.target.value)}
      />
      <button type="submit" style={buttonStyle} disabled={running}>
        {running ? "Running..." : "Run Simulation"}
      </button>
    </form>
  );
}

export default SimulationForm;
