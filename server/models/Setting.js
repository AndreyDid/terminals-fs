const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
      sumTerminal: { type: Number, required: true },
      sumPgi: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Setting", schema);
