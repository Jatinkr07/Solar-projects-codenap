import express from "express";
import {
  deleteContact,
  getContactDetails,
  getContactStats,
  submitContactForm,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContactForm);
router.get("/", getContactDetails);
router.delete("/:id", deleteContact);
router.get("/contact-stats", getContactStats);

export default router;
