// backend/src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const simulateRouter = require('./routes/simulate');
app.use('/api', simulateRouter);

app.get('/', (req, res) => {
  res.send('GreenCart Logistics API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
