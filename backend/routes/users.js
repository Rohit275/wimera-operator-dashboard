const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const Cell = require("../models/Cells");
const SuperUser = require("../models/superuser");
const activity = require("../models/activity");
const router = express.Router();
let uname;

router.get("/getroles", (req, res, next) => {
  User.find()
    .populate("cell")
    .then((documents) => {
      // console.log("Get roles :", documents);
      res.status(200).json({
        message: "Roles fetched successfully!",
        users: documents,
      });
    });
});

router.post("/getoperatorvalues", (req, res, next) => {
  var data = req.body.uname;
  User.findOne({
    RoleName: "Operator",
    userName: data,
  })
    .populate("cell")
    .then((documents) => {
      res.status(200).json(documents);
    });
});

router.get("/getcells", (req, res, next) => {
  Cell.find().then((documents) => {
    res.status(200).json({
      message: "Cells fetched successfully!",
      cells: documents,
    });
  });
});

router.get("/getactivity", (req, res, next) => {
  activity.find().then((documents) => {
    res.status(200).json({
      message: "Activities fetched successfully!",
      cells: documents,
    });
  });
});

router.post("/getcell", (req, res, next) => {
  console.log("/getcell", req.body);
  Cell.findOne({
    Bay: req.body.bay,
    cellName: req.body.cell,
    checklistName: req.body.checklist,
  }).then((documents) => {
    res.status(200).json(documents);
  });
});

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then((machine) => {
    if (machine) {
      res.status(200).json(machine);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
});

router.get("/getcell/:id", (req, res, next) => {
  Cell.findById(req.params.id).then((cell) => {
    if (cell) {
      res.status(200).json(cell);
    } else {
      res.status(404).json({ message: "Machine not found!" });
    }
  });
});

router.post("/addrole", (req, res, next) => {
  let data = new User({
    RoleName: req.body.data.RoleName,
    userName: req.body.data.userName,
    Password: req.body.data.Password,
    cell: req.body.cell,
  });
  console.log("Req.body :", data);
  data.save().then((addedValue) => {
    console.log(addedValue);
    res.status(201).json({
      message: "Role added succesfully!",
    });
  });
});

router.post("/addcell", (req, res, next) => {
  let data = new Cell(req.body);
  console.log(data);
  data.save().then((addedValue) => {
    console.log(addedValue);
    res.status(201).json({
      message: "Cell added succesfully!",
    });
  });
});

router.post("/getcellid", (req, res, next) => {
  var cells = req.body;
  console.log("cells", req.body);
  Cell.findOne({
    cellName: req.body.cellName,
    checklistName: req.body.checklistName,
    Bay: req.body.Bay,
  }).then((user) => {
    if (!user) {
      console.log(user);
      return res.json(null);
    } else {
      console.log(user);
      res.status(200).json(user);
    }
  });
});

router.post("/login", (req, res, next) => {
  let model;
  if (req.body.role == "Admin" || req.body.role == "Supervisor") {
    model = SuperUser;
  } else {
    model = User;
  }

  model
    .findOne({
      RoleName: req.body.role,
      userName: req.body.userName,
      Password: req.body.password,
    })
    .then((user) => {
      if (!user) {
        //console.log(user);
        return res.json(null);
      } else {
        uname = user.userName;
        res.status(200).json(user);
      }
    });
});

router.post("/addsuperuser", (req, res, next) => {
  let data = new SuperUser({
    RoleName: req.body.data.roleName,
    userName: req.body.data.username,
    Password: req.body.data.password,
  });
  console.log(data);
  data.save().then((addedValue) => {
    console.log(addedValue);
    res.status(201).json({
      message: "User added succesfully!",
    });
  });
});

router.put("/:id", (req, res, next) => {
  console.log("put: ", req.body);
  User.updateOne(
    { _id: req.params.id },
    {
      RoleName: req.body.data.RoleName,
      userName: req.body.data.userName,
      Password: req.body.data.Password,
      cell: req.body.cell,
    }
  ).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update succesful!" });
  });
});

router.put("/updatecell/:id", (req, res, next) => {
  Cell.updateOne(
    { _id: req.params.id },
    {
      cellName: req.body.cellName,
      checklistName: req.body.checklistName,
      Bay: req.body.Bay,
      MacNo: req.body.MacNo,
    }
  ).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update succesful!" });
  });
});

router.delete("/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post deleted!" });
  });
});

router.delete("/deletecell/:id", (req, res, next) => {
  Cell.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
