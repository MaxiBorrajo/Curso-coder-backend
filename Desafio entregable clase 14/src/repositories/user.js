import mongoose from "mongoose";
import bcrypt from "bcrypt";
import added from "../repositories/added.js";
import buy from "../repositories/buys.js";
import cart from "../repositories/cart.js";
import comment from "../repositories/comment.js";
import message from "../repositories/message.js";
import uploadImagesMiddleware from "../middlewares/uploadImages.middleware.js";
import cartService from "../services/cart.service.js";

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
    publidId: {
      type: String,
      default: "x1vdmydenrkd3luzvjv6",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("findByIdAndDelete", async function (next) {
  try {
    const relationships = [added, buy, cart, comment, message];
    for (const relation of relationships) {
      await relation.deleteMany({ idUser: this._id });
    }

    if (this.publidId !== "x1vdmydenrkd3luzvjv6") {
      await uploadImagesMiddleware.deleteImageInCloud(this.publicId);
    }

    next();
  } catch (error) {
    next(error);
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
  const foundCart = await cartService.getByFilter({ idUser: this._id });

  if (!foundCart) {
    await cartService.create({ idUser: this._id });
  }
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = new mongoose.model("users", userSchema);

export default user;
