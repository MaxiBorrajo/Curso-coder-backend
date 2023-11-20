//imports
import mongoose from "mongoose";

//schema
const productPhotoSchema = new mongoose.Schema(
  {
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    urlProductPhoto: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const productPhoto = new mongoose.model("productPhotos", productPhotoSchema);

export default productPhoto;
