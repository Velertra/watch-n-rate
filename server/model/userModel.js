const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const user = new Schema(
    { 
        username: { type: String, required: false, unique: true, trim: true }, 
        password: { type: String,  required: false, trim: true }, 
        following: [{ type: Schema.Types.ObjectId, ref: "User" }], 
        followers: [{ type: Schema.Types.ObjectId, ref: "User" }], 
        liked: [{ type: Schema.Types.ObjectId, ref: "Feature" }], 
        watchlist: [{ type: Schema.Types.ObjectId, ref: "Feature" }],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        notes: [{ type: Schema.Types.ObjectId, ref: "Notes" }],
        watched: [{ type: Schema.Types.ObjectId, ref: "Feature" }],
        imagePath: { type: String, default: "TGsKci01_wxanrs" }
    }
);

module.exports = mongoose.model("User", user);