import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      max: 99,
      min: 0,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      default:'user'
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const user = new mongoose.model("users", userSchema);

export default user;
