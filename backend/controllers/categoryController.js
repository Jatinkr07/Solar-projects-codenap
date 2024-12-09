import Category from "../models/Category.js";
import fs from "fs";

import path from "path";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const name = req.body.name ? JSON.parse(req.body.name) : null;
    const image = req.file ? req.file.filename : null;

    if (!name || !name.en || !name.fr || !image) {
      return res
        .status(400)
        .json({ message: "Category name and image are required." });
    }

    const newCategory = new Category({
      name: {
        en: name.en,
        fr: name.fr,
      },
      image,
    });

    await newCategory.save();
    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create category", error });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch categories", error });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  console.log("Request Params (ID):", req.params.id);
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;
    const parsedName = JSON.parse(name);
    // console.log(JSON.parse(name), "PARSE");
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (name) {
      category.name.en = parsedName?.en || category.name.en;
      category.name.fr = parsedName?.fr || category.name.fr;
    }

    console.log("Updated Name (EN):", category.name.en);
    console.log("Updated Name (FR):", category.name.fr);

    if (image) {
      const oldImagePath = path.join("uploads/categories", category.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      category.image = image;
    }

    await category.save();
    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update category", error });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (category.image) {
      const imagePath = path.join("uploads/categories", category.image);
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath);
      }
    }

    await category.deleteOne();
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete category", error });
  }
};

// Get total Category count
export const getCategoryCount = async (req, res) => {
  try {
    const totalCategory = await Category.countDocuments();
    res.status(200).json({ totalCategory });
  } catch (error) {
    console.error("Error fetching product stats:", error);
    res
      .status(500)
      .json({ message: "Error fetching product stats", error: error.message });
  }
};

// Linking a product with a category
export const linkProductWithCat = async (req, res) => {
  const { categoryId } = req.params;
  const { productId } = req.body;

  try {
    const category = await Category.findById(categoryId).populate("isTrending");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isTrending = productId;

    await category.save();

    const updatedCategory = await Category.findById(categoryId).populate(
      "isTrending"
    );

    return res.status(200).json({
      message: "Trending product set successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error linking product with category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//trends
// export const setTrendingProduct = async (req, res) => {
//   const { categoryId } = req.params;
//   const { productId } = req.body;

//   if (!productId) {
//     return res.status(400).json({ message: "Product ID is required" });
//   }

//   try {
//     // Fetch category by ID
//     const category = await Category.findById(categoryId).populate("products");

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     -
//     const productObjectId = new mongoose.Types.ObjectId(productId);

//     const productExistsInCategory = category.products.some((prod) =>
//       prod._id.equals(productObjectId)
//     );

//     if (!productExistsInCategory) {
//       return res.status(400).json({
//         message: "The product does not belong to this category",
//       });
//     }

//     category.isTrending = productObjectId;
//     await category.save();

//     return res.status(200).json({
//       message: "Trending product set successfully",
//       trendingProduct: category.isTrending,
//     });
//   } catch (error) {
//     console.error("Error setting trending product:", error);
//     return res.status(500).json({ message: "Internal server error", error });
//   }
// };

// category with linked trending product
export const getCategoryWithProducts = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId).populate("isTrending");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (category.isTrending) {
      return res.status(200).json({
        ...category.toObject(),
        products: [category.isTrending],
      });
    }

    return res.status(200).json({
      ...category.toObject(),
      products: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
