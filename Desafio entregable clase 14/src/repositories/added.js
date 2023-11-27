//imports
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//schema
const addedSchema = new mongoose.Schema(
  {
    idCart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      required: true,
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

addedSchema.plugin(mongoosePaginate);

const added = new mongoose.model("added", addedSchema);

export default added;
