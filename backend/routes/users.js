const express = require("express");
const mongoose = require("mongoose");
const machineJs = require("../models/machine");
var app = require("../app");
const roleSchema = new mongoose.Schema({}, { strict: false });
const router = express.Router();

router.post("/addrole", (req, res, next) => {
  Role = mongoose.model("Role", roleSchema);
  let data = new Role(req.body);
  data.save().then((addedValue) => {
    console.log(addedValue);
    res.status(201).json({
      message: "Role added succesfully!",
    });
  });
});

router.get("/getroles", (req, res, next) => {
  Role = mongoose.model("Role", roleSchema);
  Role.find()
    .select({ _id: 0, __v: 0 })
    .then((documents) => {
      res.status(200).json({
        message: "Roles fetched successfully!",
        roles: documents,
      });
    });
});

module.exports = router;
