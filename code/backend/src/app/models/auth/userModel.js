import { Schema, model } from "mongoose";
import { compare, hash, genSaltSync } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { CONSTANTS } from "../../../configuration/config.js";
const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "User",
    versionKey: false,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};
userSchema.methods.genToken = function () {
  return jsonwebtoken.sign({ email: this.email }, CONSTANTS.jwtSecret, {
    algorithm: "HS256",
    expiresIn: CONSTANTS.jwtTimeoutDuration,
  });
};
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = hash(this.password, genSaltSync(8));
  }
  next();
});

const User = model("User", userSchema);

export default User;
