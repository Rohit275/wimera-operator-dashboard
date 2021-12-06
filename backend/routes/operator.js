const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const Cell = require("../models/Cells");
const Sheet = require("../models/Sheet");

const router = express.Router();

router.get("/getsheets", (req, res, next) => {
  Sheet.find()
    .populate("cell")
    .then((documents) => {
      res.status(200).json(documents);
    });
});

module.exports = router;
