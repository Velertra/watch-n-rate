const User = require("../model/userModel");
const Review = require("../model/reviewModel");
const Feature = require("../model/featureModel");


const getUserReviews = async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    const reviews = await Review.find({ author: user._id}).populate({
        path: "feature"
    });
    
    res.json({reviews})
}

module.exports = { getUserReviews };