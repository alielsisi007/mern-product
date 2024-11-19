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
  app.use(express.static(path.join(__dirname, "/frontend/app/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "app", "dist", "index.html")
    );
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost: ${PORT}`);
});

// FPKSxKsd1YSKCHsG /// qKH7MgUt3MXVx42F
// mongodb+srv://alielsisicode:qKH7MgUt3MXVx42F@cluster0.g0uv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
