//imports
import mongoose from "mongoose";
import { deleteImageInCloud } from "../middlewares/uploadImages.middleware.js";
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

productPhotoSchema.pre(
  "findOneAndDelete",
  async function (next) {
    try {
      const docToDelete = await this.model.findOne(this.getQuery());
      await deleteImageInCloud(docToDelete.publicId);
      next();
    } catch (error) {
      next(error);
    }
  }
);

const productPhoto = new mongoose.model("productPhotos", productPhotoSchema);

export default productPhoto;
