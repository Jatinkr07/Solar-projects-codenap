import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    fr: { type: String, required: true },
  },
  image: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  isTrending: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

export default mongoose.model("Category", CategorySchema);
