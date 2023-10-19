const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    extraWorks: { type: String, required: true },
    month: { type: Object, required: true },
    year: { type: Object, required: true },
    sum: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = model("ExtraWorks", schema);
