const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const review = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        timestamp: { type: Date, required: true },
        likes: [{ type: Schema.Types.ObjectId, ref: "User"}]
    }
);

module.exports = mongoose.model("Review", review);