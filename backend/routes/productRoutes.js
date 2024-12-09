import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsCount,
  getTopProducts,
  getSuggestions,
  toggleActiveStatus,
  getActiveProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);
router.get("/product/count", getProductsCount);
router.get("/get/top-list", getTopProducts);
router.get("/suggest/search-product", getSuggestions);
router.put("/:id/product-active-status", toggleActiveStatus);
router.get("/get/active/product", getActiveProducts);

export default router;
