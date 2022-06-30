const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json("Unauthorised");
  }

  if (bearer) {
    const token = bearer.split(" ")[1].trim();

    jwt.verify(token, process.env.JWT_SECRETS, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Unauthorised");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userId === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("Unauthorised");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("Unauthorised");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
