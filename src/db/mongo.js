const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/userInfo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected..");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
