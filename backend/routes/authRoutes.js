import express from "express";
import {
  adminLogin,
  getAdminDashboard,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin-login", adminLogin);

router.get("/admin-dashboard", verifyToken, getAdminDashboard);

export default router;
