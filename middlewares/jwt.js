const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { decode } = require("punycode");
const { error, Console } = require("console");

const secretKey = process.env.SECRET_KEY;

const generateAccessToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
    console.log(token);
    return token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Error Generating Access token");
  }
};

const verifyJWT = (req, res, next) => {
  try {
    console.log("JWT");
    const { token } = req.body;
    console.log("token", token);

    if (!token) {
      console.log(token);
      return res.status(401).json({ error: "No token " });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        if (err.name == "TokenExpiredError") {
          return res.status(401).json({ error: "Invalid Tokern" });
        }
      }
      console.log("decodede", decoded);
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  generateAccessToken,
  verifyJWT,
};
