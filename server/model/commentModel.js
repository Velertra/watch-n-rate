const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        review: [{ type: Schema.Types.ObjectId, ref: "Review"}],
        user: [{ type: Schema.Types.ObjectId, ref: "User" }],
        comment: { type: String, required: true, maxlength: 600 },
        timestamp: { type: Date, required: true},
        likes: [{ type: Schema.Types.ObjectId, ref: "User"}],
    }
);

module.exports = mongoose.model("Comment", commentSchema);