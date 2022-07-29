const mongoose = require("mongoose");

exports.configDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
