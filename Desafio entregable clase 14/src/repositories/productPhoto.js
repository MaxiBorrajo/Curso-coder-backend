//imports
import mongoose from "mongoose";
import uploadImagesMiddlware from "../middlewares/uploadImages.middleware";
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

productPhotoSchema.pre([/^delete/, "findOneAndDelete"], async function (next) {
  try {
    await uploadImagesMiddlware.deleteImageInCloud(this.publicId);
    next();
  } catch (error) {
    next(error);
  }
});

const productPhoto = new mongoose.model("productPhotos", productPhotoSchema);

export default productPhoto;
