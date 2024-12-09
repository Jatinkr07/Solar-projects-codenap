import express from "express";
import {
  deleteQuote,
  getRequestAllQuoteQueries,
  requestQuote,
} from "../controllers/quoteController.js";

const router = express.Router();

router.post("/", requestQuote);
router.get("/", getRequestAllQuoteQueries);
router.delete("/:id", deleteQuote);

export default router;
