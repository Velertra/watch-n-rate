const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const movieInfoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        rating: {
            type: String, 
            required: false,
            trim: true
        },
        comment: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                text: {
                    type: String,
                    required: true
                },
                /* likes: [] */
                timestamps: true
            }
        ]
    }
);

module.exports = mongoose.model("movieInfo", movieSchema);