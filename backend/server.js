import path from "path";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allaws us to accept json data in the req.body

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  const path = require("path"); // تأكد من استخدام require إذا لم تُستخدم الموديلات ES6
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost: ${PORT}`);
});
