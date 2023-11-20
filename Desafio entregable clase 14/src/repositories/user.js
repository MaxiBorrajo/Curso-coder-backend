import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = new mongoose.model("users", userSchema);

export default user;
