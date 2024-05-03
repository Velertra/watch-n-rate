const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const ratingSchema = new Schema(
    {
        movie: { type: Schema.Types.ObjectId, ref: "Movie" },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: String, required: true },
    }
);

module.exports = mongoose.model("Rating", ratingSchema);