const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const authorize = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { _id } = decoded;
    const user = await User.findById(_id);
    req.user = user;

    next();
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = { authorize };
