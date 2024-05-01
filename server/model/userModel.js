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
        following: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        followers: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
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
        ],
        watchList: [
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