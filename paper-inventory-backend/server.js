require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const paperRoutes = require('./routes/paperRoutes');
const assignedPaperRoutes = require('./routes/assignedPaperRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB(); 

// Routes
app.use("/api/papers", paperRoutes);
app.use('/api/assignedPapers', assignedPaperRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
