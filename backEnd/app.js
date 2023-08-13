const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
var cookieParser = require('cookie-parser')
const articleRoutes = require("./routes/articleRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
require("./config/db").connectDB();
//connectDB();

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/users", articleRoutes); // Use user routes under /api/users path

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
