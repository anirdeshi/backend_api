const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const curtoken = req.headers.authorization.split(" ")[1];
    const token = jwt.verify(curtoken, "secret-key-initial");

    if (token != null && token != undefined) {
      next();
    } else {
      res.status(401).json({
        message: "unauthorized user..",
      });
    }
  } catch {
    res.status(401).json({
      error: "unauthorized user..",
    });
  }
};
