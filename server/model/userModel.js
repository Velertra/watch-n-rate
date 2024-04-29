const mongoose = require("mongoose");
 
const { Schema } = mongoose;

const user = new Schema(
    {
        username: {
            type: String,
            required: false,
            unique: true,
            trim: true
        },
        password: {
            type: String, 
            required: false,
            trim: true
        },
        favFeatures: [
            {
                title: {
                    type: Array,
                    require: false
                },
                type: {
                    type: Array,
                    require: false
                },
                featureId: {
                    type: Array,
                    require: false
                }
            }
        ]
    }
);

module.exports = mongoose.model("User", user);