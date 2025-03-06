require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect to MongoDB
connectDB();

//routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');


// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("MERN Auth System");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));