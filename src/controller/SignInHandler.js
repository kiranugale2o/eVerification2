const User = require("../model/User.js");
const DatabaseConn = require("../database/DatabaseCon.js");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const SingInHandler = async (req, res, next) => {
  try {
    await DatabaseConn();
    let { email, password } = req.body;
    console.log(email);

    //check values
    if (email === "" || password === "") {
      return res.json({
        success: false,
        message: "All Values are Required !",
      });
    }

    //remove whitespace
    email = email.trim();
    password = password.trim();
    console.log(email);

    //check user email is exit
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      //check password correct or not
      const isMatch = await bcrypt.compare(password, userExit.password);

      if (isMatch) {
        const token = userExit.token;
        return res.json({
          success: true,
          message: "Login Success !",
          token: token,
        });
      } else {
        return res.json({
          success: false,
          message: "Password Wrong !",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Email Wrong !",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went Wrong , please try again !",
    });
  }
};

module.exports = SingInHandler;
