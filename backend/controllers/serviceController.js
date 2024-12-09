/* eslint-disable no-unused-vars */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Service from "../models/Service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new service
export const createService = async (req, res) => {
  try {
    const {
      headingEn,
      headingFr,
      descriptionEn,
      descriptionFr,
      titleEn,
      titleFr,
      subDescriptionEn,
      subDescriptionFr,
    } = req.body;

    if (!headingEn || !headingFr || !titleEn || !titleFr) {
      return res.status(400).json({ error: "Heading and title are required" });
    }

    if (
      !descriptionEn ||
      !descriptionFr ||
      !subDescriptionEn ||
      !subDescriptionFr
    ) {
      return res
        .status(400)
        .json({ error: "Description and sub-description are required" });
    }

    const banner = req.files?.banner
      ? `/uploads/ourservices/${req.files.banner[0].filename}`
      : null;
    const mainImg = req.files?.mainImg
      ? `/uploads/ourservices/${req.files.mainImg[0].filename}`
      : null;

    console.log("Files received:", { banner, mainImg });

    const newService = new Service({
      heading: {
        en: headingEn,
        fr: headingFr,
      },
      description: {
        en: descriptionEn,
        fr: descriptionFr,
      },
      title: {
        en: titleEn,
        fr: titleFr,
      },
      subDescription: {
        en: subDescriptionEn,
        fr: subDescriptionFr,
      },
      banner,
      mainImg,
    });

    await newService.save();
    return res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve services" });
  }
};

// Get a single service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve service" });
  }
};

// Update a service by ID
export const updateService = async (req, res) => {
  try {
    const existingService = await Service.findById(req.params.id);

    if (!existingService) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (req.body.removeBanner || req.body.removeMainImg) {
      if (req.body.removeBanner && existingService.banner) {
        const bannerPath = path.join(__dirname, "..", existingService.banner);
        fs.unlink(bannerPath, (err) => {
          if (err) console.error("Failed to delete banner:", err);
        });
        existingService.banner = null;
      }

      if (req.body.removeMainImg && existingService.mainImg) {
        const mainImgPath = path.join(__dirname, "..", existingService.mainImg);
        fs.unlink(mainImgPath, (err) => {
          if (err) console.error("Failed to delete main image:", err);
        });
        existingService.mainImg = null;
      }
    }

    if (req.files?.banner) {
      const newBanner = `/uploads/ourservices/${req.files.banner[0].filename}`;
      existingService.banner = newBanner;
    }

    if (req.files?.mainImg) {
      const newMainImg = `/uploads/ourservices/${req.files.mainImg[0].filename}`;
      existingService.mainImg = newMainImg;
    }

    // Update multilingual fields
    existingService.heading.en =
      req.body.headingEn || existingService.heading.en;
    existingService.heading.fr =
      req.body.headingFr || existingService.heading.fr;
    existingService.description.en =
      req.body.descriptionEn || existingService.description.en;
    existingService.description.fr =
      req.body.descriptionFr || existingService.description.fr;
    existingService.title.en = req.body.titleEn || existingService.title.en;
    existingService.title.fr = req.body.titleFr || existingService.title.fr;
    existingService.subDescription.en =
      req.body.subDescriptionEn || existingService.subDescription.en;
    existingService.subDescription.fr =
      req.body.subDescriptionFr || existingService.subDescription.fr;

    const updatedService = await existingService.save();

    res.json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Failed to update service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
};

// Delete a service by ID
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (deletedService.banner) {
      const bannerPath = path.join(__dirname, "..", deletedService.banner);
      fs.unlink(bannerPath, (err) => {
        if (err) console.error("Failed to delete banner:", err);
      });
    }

    if (deletedService.mainImg) {
      const mainImgPath = path.join(__dirname, "..", deletedService.mainImg);
      fs.unlink(mainImgPath, (err) => {
        if (err) console.error("Failed to delete main image:", err);
      });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
};

// Get top services
export const getTopServices = async (req, res) => {
  try {
    const topProducts = await Service.find().sort({ createdAt: -1 }).limit(5);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top products" });
  }
};
