const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const featureSchema = new Schema(
    {
        title: { type: String, required: true, unique: true, trim: true },
        featureId: { type: String, required: true },
        type: { type: String, required: true},
        rating: { type: Schema.Types.ObjectId, ref: "Rating" },
        liked: [{ type: Schema.Types.ObjectId, ref: "User"}],
        /* watchlist: [{ type: Schema.Types.ObjectId, ref: "User" }], */
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review"}],
        /* Notes: [{ type: Schema.Types.ObjectId, ref: "Notes"}], */
    }
);

module.exports = mongoose.model("Feature", featureSchema);