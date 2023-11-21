//imports
import mongoose from "mongoose";

//schema
const buysSchema = new mongoose.Schema(
  {
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const buy = new mongoose.model("buys", buysSchema);

export default buy;
