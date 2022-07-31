const { userModel } = require("../models/userModel.js");
const { userValidate } = require("../models/userModel.js");
const createError = require("http-errors");
const genJwtToken = require("../middlewares/jwtToken.js");

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

      res.status(200).json({
        success: true,
        status: 200,
        message: "Registered Succussfully",
      });
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const isUserReg = await userModel.findOne({ email }).select("+password");

      if (!isUserReg)
        throw next(createError.Unauthorized("Email or Password is incorrect"));

      if (!password)
        throw next(createError.Unauthorized("Password should not be empty"));

      const isPassMatch = await isUserReg.comparePassword(password);

      if (!isPassMatch)
        throw next(createError.Unauthorized("Email or Password is incorrect"));

      const jwtToken = genJwtToken(isUserReg._id);

      res.json({
        isUserReg,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = userController;
