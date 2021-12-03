const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const User = mongoose.Schema({
  userName: { type: String, required: true },
  RoleName: { type: String, required: true },
  Password: { type: String, required: true },
  cell: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cell",
    },
  ],
});

module.exports = mongoose.model("User", User);
