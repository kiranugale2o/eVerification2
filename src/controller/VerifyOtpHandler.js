const User = require("../model/User.js");
const DatabaseConn = require("../database/DatabaseCon.js");
const jwt = require("jsonwebtoken");

const VerifyOtpHandler = async (req, res, next) => {
  await DatabaseConn();
  try {
    let { email, otp } = req.body;

    // Find the user
    const user = await User.findOne({ email: email });
    otp = otp.trim();
    if (!user) {
      return res.json({
        success: false,
        message: "This Email is Not found try again!",
      });
    }

    const token = jwt.sign(
      { email, userId: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Check if OTP is correct and not expired

    if (user.otp === otp && Date.now() < user.expiration) {
      await User.updateOne(
        { email: email },
        { verifyUser: true, token: token }
      );
      return res.json({
        success: true,
        message: "Email verified",
        user: user,
        token: token,
      });
    } else if (Date.now() >= user.expiration) {
      return res.json({
        success: false,
        message: "otp exprise",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.log(error.message);

    return res.json({
      success: false,
      message: "Server problem",
    });
  }
};

module.exports = VerifyOtpHandler;
