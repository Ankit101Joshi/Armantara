require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const ProductRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY!");
  });

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ProductRoutes);
app.use("/api", orderRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
