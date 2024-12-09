import express from "express";
import {
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  createService,
  getTopServices,
} from "../controllers/serviceController.js";

const router = express.Router();

router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.get("/get/top-service-here", getTopServices);

export default router;
