const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("MongoDB connection failed"));

// Routes
app.use("/api/v1", require("./routes/authRoutes"));
app.use("/api/v1", require("./routes/cartRoutes"));
app.use("/api/v1", require("./routes/githubRoutes"));
app.use("/api/v1", require("./routes/restaurantRoutes")); // Using the restaurantRoutes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
