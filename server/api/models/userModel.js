const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: isEmail,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);

    this.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

exports.userValidate = Joi.object({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  avatar: Joi.string(),
});

exports.userModel = mongoose.model("user", userSchema);
