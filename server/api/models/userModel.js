const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Joi = require("joi");

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

exports.userValidate = Joi.object({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

exports.userModel = mongoose.model("user", userSchema);
