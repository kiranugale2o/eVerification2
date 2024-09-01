const User = require("../model/User.js");
const DatabaseConn = require("../database/DatabaseCon.js");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
const SingUpHandler = async (req, res, next) => {
  await DatabaseConn();
  try {
    let { email, password, appName = "HACKJACK" } = req.body;

    if (email === "" || password === "") {
      return res.json({
        success: false,
        message: "All Values are Required !",
      });
    }

    //Check Email is Already exit in database
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      if (!userExit.verifyUser) {
        await User.deleteOne({ email: email });
      }
      return res.json({
        success: false,
        message: "this email address already Used !",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = Date.now() + 60000;

    email = email.trim();
    password = password.trim();
    var salt = await bcrypt.genSalt(10);
    var hashPass = await bcrypt.hash(password, salt);
    console.log(hashPass);

    //add user email and otp in database
    const user = await User({
      email,
      password: hashPass,
      otp,
      expiration,
      verifyUser: false,
    });
    await user.save();

    if (user) {
      // Send OTP email
      transporter.sendMail({
        to: email,
        subject: "Email Verification Code ",
        html: `
         <div>
          <h1>${appName}</h1>
            <h1 class="color:"red"">Verification code</h1>
             <br/>
            <b>Enter the following verification code when prompted:
            <h1>
            <bold>
            ${otp}
            </bold></h1> valid upto 1 minitues</b>
            <b>To Protect Do not Share this code !</b>
            <footer>thank you</footer>
          </div> 
        `,
      });
      return res.json({
        success: true,
        message: "OTP Send !",
      });
    } else {
      return res.json({
        success: false,
        message: "Somting Went Wrong !",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = SingUpHandler;
