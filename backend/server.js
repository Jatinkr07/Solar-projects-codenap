/* eslint-disable no-undef */
import express from "express";
import connectDB from "./config/db.js";
import multer from "multer";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

import quoteRoutes from "./routes/quoteRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import compression from "compression";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirectoryExists(path.join(__dirname, "uploads/products"));
ensureDirectoryExists(path.join(__dirname, "uploads/categories"));
ensureDirectoryExists(path.join(__dirname, "uploads/ourservices"));

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/categories/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const serviceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/ourservices/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadProductImages = multer({
  storage: productStorage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

const uploadCategoryImage = multer({ storage: categoryStorage });

const uploadServiceImages = multer({ storage: serviceStorage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  "/api/products",
  uploadProductImages.array("images", 10),
  productRoutes
);

app.use("/api/categories", uploadCategoryImage.single("image"), categoryRoutes);

app.use(
  "/api/services",
  uploadServiceImages.fields([
    { name: "banner", maxCount: 1 },
    { name: "mainImg", maxCount: 1 },
  ]),
  serviceRoutes
);

app.use("/api/quotes", quoteRoutes);
app.use("/api/submit-form", contactRoutes);

app.use("/api", authRoutes);

app.use(compression());

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
