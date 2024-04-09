const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const signInSchema = new Schema(
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
        }
    }
);

module.exports = mongoose.model("SignIn", signInSchema);