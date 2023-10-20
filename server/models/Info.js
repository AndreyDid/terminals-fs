const {Schema, model} = require("mongoose");

const schema = new Schema(
    {
        imageUrl: String,
        title: {type: String, required: true},
        info: {type: String, required: true},
    },
    {
        timestamps: true,
    }
)

module.exports = model("Info", schema);
