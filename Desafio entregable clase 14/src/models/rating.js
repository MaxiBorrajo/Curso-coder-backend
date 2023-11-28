//imports
import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

//schema
const ratingSchema = new mongoose.Schema(
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
    rating: {
        type: Number,
        min: 0,
        max: 5,
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ratingSchema.plugin(aggregatePaginate);

const rating = new mongoose.model("ratings", ratingSchema);

export default rating;
