//imports
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import added from "./added";
import categorized from "./categorized";
import productPhoto from "./productPhoto";
import rating from "./rating";

//schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);

productSchema.pre("findByIdAndDelete", async function (next) {
  try {
    const relationships = [added, categorized, productPhoto, rating];
    for (const relation of relationships) {
      await relation.deleteMany({ idProduct: this._id });
    }
    next();
  } catch (error) {
    next(error);
  }
});

const product = new mongoose.model("products", productSchema);

export default product;
