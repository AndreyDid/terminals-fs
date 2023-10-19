const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    sum: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Work", schema);
