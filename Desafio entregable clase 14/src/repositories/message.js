import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    idUser: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const message = new mongoose.model("messages", messageSchema);

export default message;
