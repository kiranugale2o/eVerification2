const User = require("../model/User.js");
const DatabaseConn = require("../database/DatabaseCon.js");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const ResendOtpHandler = async (req, res, next) => {
  try {
    await DatabaseConn();
    let { email, appName } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = Date.now() + 60000;

    const user = await User.findOne({ email: email });
    if (user) {
      await User.updateOne(
        { email: email },
        { otp: otp, expiration: expiration }
      );
    }
    transporter.sendMail({
      to: email,
      subject: "RESEND Your OTP Code",
      html: `
           <div>
          <h1>${appName}</h1>
            <h1 class="color:"red"">Verification code</h1>
             <br/>
            <p>Enter the following verification code when prompted:
            <h1>
            <bold>
            ${otp}
            </bold></h1> valid upto 1 minitues</p>
            <b>To Protect Do not Share this code !</b>
            <footer>thank you</footer>
          </div>`,
    });

    return res.json({
      success: true,
      message: "OTP RESEND",
    });
  } catch (error) {
    console.log(error.message);

    return res.json({
      success: false,
      message: "SOME ERROR",
    });
  }
};

module.exports = ResendOtpHandler;
