const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRETS,
    { expiresIn: "3d" }
  );
};

module.exports = createToken;
