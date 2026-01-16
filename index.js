const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const categoryRoutes = require("./routes/category");
const cors=require("cors");
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/ecomm-db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/category", categoryRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.listen(port, () => {
  console.log(`Server connected to ${port}`);
});
