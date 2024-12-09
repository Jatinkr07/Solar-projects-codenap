import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryCount,
  linkProductWithCat,
  getCategoryWithProducts,
  // setTrendingProduct,
} from "../controllers/categoryController.js";

const router = express.Router();

// Routes
router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/count", getCategoryCount);
router.put("/:categoryId/products", linkProductWithCat);
router.get("/:categoryId", getCategoryWithProducts);
// router.post("/:categoryId/trendingproducts", setTrendingProduct);

export default router;
