require("dotenv").config();
const express = require("express");
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
var cors = require('cors')
app.use(cors())
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));