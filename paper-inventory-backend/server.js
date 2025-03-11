require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const paperRoutes = require("./routes/paperRoutes");
const assignedPaperRoutes = require("./routes/assignedPaperRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// ✅ Root Route (To prevent 404 on backend URL)
app.get("/", (req, res) => {
    res.send("Backend is running successfully on Render!");
});

// API Routes
app.use("/api/papers", paperRoutes);
app.use("/api/assignedPapers", assignedPaperRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on https://paper-inventory-management-backend.onrender.com/`);
});
