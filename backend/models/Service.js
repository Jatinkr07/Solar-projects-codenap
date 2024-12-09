import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    heading: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    title: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    subDescription: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    banner: {
      type: String,
      required: true,
    },
    mainImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
