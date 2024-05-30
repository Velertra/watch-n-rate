const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const user = new Schema(
    { 
        username: { type: String, required: false, unique: true, trim: true }, 
        password: { type: String,  required: false, trim: true }, 
        following: [{ type: Schema.Types.ObjectId, ref: "User" }], 
        followers: [{ type: Schema.Types.ObjectId, ref: "User" }], 
        faved: [{ type: Schema.Types.ObjectId, ref: "Feature" }], 
        watchList: [{ type: Schema.Types.ObjectId, ref: "Feature" }],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        notes: [{ type: Schema.Types.ObjectId, ref: "Notes" }],
        
    }
);

module.exports = mongoose.model("User", user);