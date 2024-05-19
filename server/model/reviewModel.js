const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const review = new Schema(
    {
        author: [{ type: Schema.Types.ObjectId, ref: "User" }],
        content: { type: String, required: true },
        timestamp: { type: Date, required: true },
        feature: [{ type: Schema.Types.ObjectId, ref: "Feature" }],
        comment: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
        likes: [{ type: Schema.Types.ObjectId, ref: "User"}]

    }
);

module.exports = mongoose.model("Review", review);