const express = require("express");
const cors = require("cors");
require("dotenv").config();

const simulationRoutes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", simulationRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
