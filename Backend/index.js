const express = require("express");
const { sequelize } = require("./models");
const superserroutes = require("./routes/superUserRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config();
app.get("/", (req, res) => {
  res.send("helloooooooo");
});

//routes
app.use("/api/v1/superuser", superserroutes);
app.use("/api/v1/userroutes", userRoutes);
app.use("/api/v1/productroutes", productRoutes);
const port = process.env.PORT || 4500;
app.listen(port, async () => {
  console.log(`Server is running ${port}`);
  try {
    await sequelize.authenticate();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
});
