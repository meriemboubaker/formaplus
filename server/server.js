require("dotenv").config();
const express = require("express");

const path = require("path")
const app = express();
const port = 5000;
const testRouter = require("./routes/testRoutes");
const productRouter = require("./routes/productRoutes")
const userRouter = require("./routes/userRoutes")
const mongoose = require("mongoose");
mongoose
  .connect(process.env.mongodb)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => console.log(err));
app.use(express.json());
app.use("/test", testRouter);
app.use("/products",productRouter)
app.use("/users",userRouter)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${port}`);
});
