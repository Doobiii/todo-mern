const mongoose = require("mongoose");
const listSchema = new mongoose.Schema(
  {
    todoList: {
      type: String,
      required: true,
    },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("List", listSchema);
