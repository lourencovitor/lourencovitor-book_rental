const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];
  console.log(authToken);
  if (authToken !== undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];
    try {
      const decode = jwt.verify(token, process.env.SECRET_API);
      console.log(decode);
      if (decode.role === 1) {
        next();
      } else {
        res.status(401);
        return res.json({ message: "You are not allowed to see this data" });
      }
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401);
  }
};
