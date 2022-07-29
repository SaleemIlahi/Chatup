const { userModel } = require("../models/userModel.js");
const { userValidate } = require("../models/userModel.js");
const createError = require("http-errors");

class userController {
  static register = async (req, res, next) => {
    try {
      const { email } = req.body;

      await userValidate.validateAsync(req.body);

      const isReigestered = await userModel.findOne({ email });

      if (isReigestered)
        throw next(createError.Conflict("Email is already Registered"));

      const user = new userModel(req.body);

      await user.save();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = userController;
