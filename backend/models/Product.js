import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    description: {
      en: { type: String },
      fr: { type: String },
    },
    images: { type: [String] },
    technicalDetails: {
      en: { type: String },
      fr: { type: String },
    },
    features: {
      en: { type: String },
      fr: { type: String },
    },
    specifications: {
      en: { type: String },
      fr: { type: String },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

productSchema.virtual("categoryName", {
  ref: "Category",
  localField: "category",
  foreignField: "_id",
  justOne: true,
});

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Product", productSchema);
