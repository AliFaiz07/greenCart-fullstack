const express = require("express");
const { runSimulation } = require("./simulation");

const router = express.Router();

router.post("/simulate", (req, res) => {
  try {
    const { inputs, drivers, routes, orders } = req.body || {};
    if (!inputs || !drivers || !routes || !orders) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = runSimulation(inputs, drivers, routes, orders);
    if (result.error) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
