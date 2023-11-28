//imports
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

categorizedSchema.plugin(mongoosePaginate);

const categorized = new mongoose.model("categorized", categorizedSchema);

export default categorized;
