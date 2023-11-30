import mongoose from "mongoose";
import bcrypt from "bcrypt";
import added from "./added.js";
import cart from "./cart.js";
import comment from "./comment.js";
import { deleteImageInCloud } from "../middlewares/uploadImages.middleware.js";
import CartService from "../services/Cart.service.js";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: function () {
        return !this.oauthUser;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: function () {
        return !this.oauthUser;
      },
      max: 99,
      min: 0,
    },
    password: {
      type: String,
      required: function () {
        return !this.oauthUser;
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    oauthUser: {
      type: Boolean,
      default: false,
    },
    urlProfilePhoto: {
      type: String,
      default:
        "https://asset.cloudinary.com/dixntuyk8/86914f2b6bc2dfd2b6a69aa670cd4853",
    },
    publicId: {
      type: String,
      default: "x1vdmydenrkd3luzvjv6",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre(["findByIdAndDelete", "findOneAndDelete", "deleteOne", "deleteMany"], async function (next) {
  try {
    const docToDelete = await this.model.findOne(this.getQuery());

    const relationships = [added, cart, comment];

    for (const relation of relationships) {
      await relation.deleteMany({ idUser: docToDelete._id });
    }

    if (docToDelete.publicId !== "x1vdmydenrkd3luzvjv6") {
      await deleteImageInCloud(docToDelete.publicId);
    }

    next();
  } catch (error) {
    throw error;
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

userSchema.post("save", async function () {
  const foundCart = await CartService.getByFilter({ idUser: this._id });

  if (!foundCart) {
    await CartService.create({ idUser: this._id });
  }
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = new mongoose.model("users", userSchema);

export default user;
