const express = require("express");
const SingUpHandler = require("../controller/SignUpHandler.js");
const SingInHandler = require("../controller/SignInHandler.js");
const ResendOtpHandler = require("../controller/ResendOtpHandler");
const VerifyOtpHandler = require("../controller/VerifyOtpHandler.js");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", (req, res) => {
  res.send(`
    <h1>Everification 2.o</h1>
    `);
});

router.post("/api/sign-in", SingInHandler);
router.post("/api/sign-up", SingUpHandler);
router.post("/api/sign-up/resend-otp", ResendOtpHandler);
router.post("/api/sign-up/verification-email", VerifyOtpHandler);
module.exports = router;
