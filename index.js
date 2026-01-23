const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const categoryRoutes = require("./routes/category");
const brandRoutes=require("./routes/brand")
const productRoutes=require("./routes/product");
const authRoutes=require("./routes/auth");
const cors=require("cors");
app.use(cors());
const customerRoutes=require('./routes/customer');
const {verifyToken}=require('./middleware/auth')
const {isAdmin}=require('./middleware/auth')
mongoose
  .connect("mongodb://127.0.0.1:27017/ecomm-db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/category",verifyToken,isAdmin,categoryRoutes);
app.use("/brand",verifyToken,isAdmin,brandRoutes);
app.use("/product",verifyToken,isAdmin,productRoutes);
app.use("/customer",verifyToken,customerRoutes);
app.use("/auth",authRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.listen(port, () => {
  console.log(`Server connected to ${port}`);
});
