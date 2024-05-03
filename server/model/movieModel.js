const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const movieSchema = new Schema(
    {
        title: { type: String, required: true, unique: true, trim: true },
        featureId: { type: String, required: true },
        type: { type: String, required: true},
        rating: { type: Number, required: false, trim: true },
        liked: [{ type: Schema.Types.ObjectId, ref: "User"}],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review"}],
        Notes: [{ type: Schema.Types.ObjectId, ref: "Notes"}],
    }
);

module.exports = mongoose.model("Movie", movieSchema);