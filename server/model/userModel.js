const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const user = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String, 
            required: true,
            trim: true
        },
        favMoives: {
            type: Array,
            required: false
        }
    }
);

module.exports = mongoose.model("User", user);