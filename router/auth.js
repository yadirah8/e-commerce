const express = require("express");
const User = require("../resources/users/user.model");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const createToken = require("../utils/token");
const validationMiddleware = require("../middleware/validation");
const { login, register } = require("../resources/users/user.validation");

const router = express.Router();

dotenv.config();

router.post("/register", validationMiddleware(register), async (req, res) => {
  let { username, email, password, isAdmin } = req.body;
  const payload = new User({ username, email, password, isAdmin });
  payload.password = CryptoJS.AES.encrypt(password, process.env.JWT_SECRETS);

  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    existingUser &&
      res.status(400).json("Username or email exists, proceed to login!");

    const user = await payload.save();
    const token = createToken(user);

    const { password, ...others } = user._doc;

    res.status(201).json({ user: others, token: token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", validationMiddleware(login), async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    !user && res.status(500).json("User not found");

    const hashedPassword = await CryptoJS.AES.decrypt(
      user.password,
      process.env.JWT_SECRETS
    );

    const decryptPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    decryptPassword !== req.body.password &&
      res.status(500).json("Wrong password");

    const token = createToken(user);

    const { password, ...others } = user._doc;

    res.status(201).json({ user: others, token: token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
