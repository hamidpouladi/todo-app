const mongoose = require("mongoose");
//mongo ducumnet schema
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ["todo", "doing", "completed"],
    default: "todo",
  },
});

module.exports = mongoose.model("todo", todoSchema);
