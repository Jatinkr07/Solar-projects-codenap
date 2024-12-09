/* eslint-disable no-unused-vars */
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import mongoose from "mongoose";

// Validate category
const validateCategory = async (categoryId) => {
  const existingCategory = await Category.findById(categoryId);
  return existingCategory;
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      titleEn,
      titleFr,
      descriptionEn,
      descriptionFr,
      // price,
      technicalDetailsEn,
      technicalDetailsFr,
      featuresEn,
      featuresFr,
      specificationsEn,
      specificationsFr,
      category,
      active = true,
    } = req.body;

    // Validate if the category exists
    const existingCategory = await validateCategory(category);
    if (!existingCategory) {
      // if (false) {
      return res.status(404).json({ message: "Category not found......" });
    }

    // Handle images
    const images = req.files
      ? req.files.map((file) => `/uploads/products/${file.filename}`)
      : [];

    const newProduct = new Product({
      title: {
        en: titleEn,
        fr: titleFr,
      },
      description: {
        en: descriptionEn,
        fr: descriptionFr,
      },
      technicalDetails: {
        en: technicalDetailsEn,
        fr: technicalDetailsFr,
      },
      features: {
        en: featuresEn,
        fr: featuresFr,
      },
      specifications: {
        en: specificationsEn,
        fr: specificationsFr,
      },
      images,
      category,
      active,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate category existence
    const categoryExists = await validateCategory(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch products by category, considering active status
    const products = await Product.find({
      category: categoryId,
      active: true,
    }).populate("category", "name");

    console.log("Fetched products:", products);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No active products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const {
      titleEn,
      titleFr,
      descriptionEn,
      descriptionFr,
      technicalDetailsEn,
      technicalDetailsFr,
      featuresEn,
      featuresFr,
      specificationsEn,
      specificationsFr,
      category,
      active,
      imagesToRemove = [],
    } = req.body;

    const existingCategory = await validateCategory(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newImages = req.files
      ? req.files.map((file) => `/uploads/products/${file.filename}`)
      : [];

    const updatedImages = existingProduct.images.filter(
      (img) => !imagesToRemove.includes(img)
    );

    const finalImages = [...updatedImages, ...newImages];

    //exist
    const updatedData = {
      title: {
        en: titleEn || existingProduct.title.en,
        fr: titleFr || existingProduct.title.fr,
      },
      description: {
        en: descriptionEn || existingProduct.description.en,
        fr: descriptionFr || existingProduct.description.fr,
      },
      technicalDetails: {
        en: technicalDetailsEn || existingProduct.technicalDetails.en,
        fr: technicalDetailsFr || existingProduct.technicalDetails.fr,
      },
      features: {
        en: featuresEn || existingProduct.features.en,
        fr: featuresFr || existingProduct.features.fr,
      },
      specifications: {
        en: specificationsEn || existingProduct.specifications.en,
        fr: specificationsFr || existingProduct.specifications.fr,
      },
      images: finalImages,
      category: category || existingProduct.category,
      active: active !== undefined ? active : existingProduct.active,
    };

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a particular product
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product details" });
  }
};

// Get total product count
export const getProductsCount = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.status(200).json({ totalProducts });
  } catch (error) {
    console.error("Error fetching product stats:", error);
    res
      .status(500)
      .json({ message: "Error fetching product stats", error: error.message });
  }
};

// Get top products
export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Product.find({ active: true })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top products" });
  }
};

// Get product suggestions
export const getSuggestions = async (req, res) => {
  const query = req.query.query;
  try {
    const products = await Product.find({
      title: query,
      active: true,
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

//active product
export const toggleActiveStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.active = !product.active;
    await product.save();

    res.status(200).json({ message: "Product active status updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get active product

export const getActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ active: true }).populate(
      "category",
      "name"
    );

    if (products.length === 0) {
      return res.status(404).json({ message: "No active products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching active products:", error);
    res.status(500).json({ error: error.message });
  }
};
