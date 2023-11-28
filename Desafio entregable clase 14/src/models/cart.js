//imports
import mongoose from "mongoose";
import added from "./added.js";
//schema
const cartSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bought: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const cart = new mongoose.model("carts", cartSchema);

export default cart;
