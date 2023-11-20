//imports
import mongoose from "mongoose";

//schema
const categorySchema = new mongoose.Schema(
  {
    category: {
      type: "string",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const category = new mongoose.model("categories", categorySchema);

export default category;
