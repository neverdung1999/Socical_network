const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const account = new Schema(
  {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    information: [],
  },
  {
    timestamps: true,
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model("user", account);
