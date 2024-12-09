import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  quantity: { type: Number, required: true },
  requirements: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quote", quoteSchema);
