const express = require("express");
const multer = require("multer");
const router = express();
const Register = require("../models/Register");
const Authmiddleware = require("../middleware/Authmiddleware");
var upload = multer({ dest: "uploadimages" });

const mimetype = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
// multer_image_middleware

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file uploaded by user..", file);
    cb(null, "./src/uploadimages");
  },
  filename: (req, file, cb) => {
    console.log("file uploaded by user..", file);
    const filename = file.originalname.toLowerCase().split(".");
    console.log("filename without ext ...", filename);
    const name = filename[0];
    const ext = mimetype[file.mimetype];
    console.log("extension....", ext);
    cb(null, name + "-" + Date.now().toString() + "." + ext);
  },
});
var upload = multer({ storage: storage });
// var upload = multer({storage: storage}).any('upldimage');

router.post("/postsuser", upload.single("images"), (req, res, next) => {
  var file = req.file;

  console.log("add data in req...........", file);
  let url = req.protocol + "://" + req.get("host");
  const register = new Register({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    pass: req.body.pass,
    cpass: req.body.cpass,
    imageUrl: url + "/images/" + req.file.path,
  });

  register.save().then((respnsedata) => {
    console.log("responsedataaaaa....", respnsedata);
    res.status(201).json({
      postedid: respnsedata._id,
      data: respnsedata,
    });
    next();
  });
  // console.log(register);
});

// router.patch({ _id: id }, (req, res, next) => {

// });

router.get("/getById/:id", (req, res, next) => {
  console.log("getbyidfor edit....", req.params.id);
  Register.findById(req.params.id).then((response) => {
    console.log(response);
    if (response) {
      res.status(200).json(response);
    } else {
      res.send.json({
        message: "record not found pls try other serach criteria..",
      });
    }
    next();
  });
});
// Authmiddleware,
router.get("/getall", async (req, res, next) => {
  const user = await Register.find();
  console.log(user);

  Register.find().then((documents) => {
    res.status(200).json({
      message: "data fetch successfully",
      userdata: user,
    });
    next();
  });
});
// Authmiddleware,
router.put("/put/:id", (req, res, next) => {
  const register = new Register({
    _id: req.params.id,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    pass: req.body.pass,
    cpass: req.body.cpass,
  });
  console.log("edit data set for ...", req.params.id);
  Register.findOneAndUpdate({ _id: req.params.id }, register).then(
    (response) => {
      res.status(200).json({
        postdata: register,
        message: "Record update successfully..",
      });
      next();
    }
  );
});
// Authmiddleware,
router.delete("/delete/:id", (req, res, next) => {
  Register.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "delete successfully...",
    });
  });
});

module.exports = router;
