//imports
import mongoose from "mongoose";
import categorized from "./categorized";
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

categorySchema.pre("findOneAndDelete", async function (next) {
  try {
    await categorized.deleteMany({ idCategory: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

const category = new mongoose.model("categories", categorySchema);

export default category;
