//imports
import mongoose from "mongoose";

//schema
const categorizedSchema = new mongoose.Schema(
  {
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    idCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const categorized = new mongoose.model("categorized", categorizedSchema);

export default categorized;
