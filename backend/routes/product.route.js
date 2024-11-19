import express from "express";
// backend/routes/product.route.js

import {
  createProducts,
  deleteProducts,
  getProducts,
  updateProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("", getProducts);
router.post("", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;
