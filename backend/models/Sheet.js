const mongoose = require("mongoose");

// var data = [];
// function getHeaders(Headers) {
//   data = Headers;
//   console.log("Receive Headers in the Schema File", data);
// }
const Sheet = mongoose.Schema({
  cell: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cell",
    },
  ],
  OperationNo: { type: String, required: true },
  value: [],
});

module.exports = mongoose.model("Sheet", Sheet);
