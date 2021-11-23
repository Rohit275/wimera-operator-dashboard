const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model("user", userSchema);

const router = express.Router();

router.get("/getroles", (req, res, next) => {
  User.find()
    .select({ _id: 0, __v: 0 })
    .then((documents) => {
      res.status(200).json({
        message: "Roles fetched successfully!",
        users: documents,
      });
    });
});

router.post("/addrole", (req, res, next) => {
  let data = new User({
    RoleName: req.body.data.RoleName,
    userName: req.body.data.userName,
    Password: req.body.data.Password,
    cell: req.body.cell,
  });
  console.log(data);
  data.save().then((addedValue) => {
    console.log(addedValue);
    res.status(201).json({
      message: "Role added succesfully!",
    });
  });
});

module.exports = router;
