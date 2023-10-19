const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
      imageUrl: {
        type: String
      },
      number: {
          type: Number,
          required: true,
      },
      body: {
          type: Schema.Types.ObjectId,
          ref: 'Body',
          required: true,
      },
      city: {
          type: String
      },
      works: [{
          type: Schema.Types.ObjectId,
          ref: 'Work',
          required: true,
      }],
      year: {
          type: Object,
          required: true,
      },
      month: {
          type: Object,
          required: true,
      },
      singleOrder: String,
      sum: {
          type: Number,
          required: true,
      },
      // user: {
      //     type: Schema.Types.ObjectId,
      //     ref: 'User',
      //     required: true,
      // },
  }, {
        timestamps: true,
    }
);

module.exports = model("Terminal", schema);
