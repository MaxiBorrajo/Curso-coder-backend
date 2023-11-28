//imports
import mongoose from "mongoose";
import categorized from "./categorized.js";
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

categorySchema.pre(
  ["findOneAndDelete", "deleteOne", "deleteMany", "findIdAndDelete"],
  async function (next) {
    try {
      await categorized.deleteMany({ idCategory: this._id });
      next();
    } catch (error) {
      next(error);
    }
  }
);

const category = new mongoose.model("categories", categorySchema);

export default category;
