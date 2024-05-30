const User = require("../model/userModel");
const Review = require("../model/reviewModel");
const Feature = require("../model/featureModel");


const getUserReviews = async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    const reviews = await Review.find({ author: user._id}).populate([
        { path: "feature" },
        { path: "author" }
    ]);
    
    res.json({reviews})
}

const getOneUserReview = async (req, res) => {
    //const user = await User.findOne({ username: req.user.username });
    
    const review = await Review.findById( req.params.mongoId ).populate([
        { path: "feature"},
        { path: "author"}
    ])
    //const feature = await Feature.findOne({ title: req.params.title })
    /* const review = await Review.findOne({ author: user._id,  feature: feature }).populate([
        { path: "feature" },
        { path: "author" }
    ]); */
    //console.log(review)
    res.json({review})
}

const editReview = async (req, res, next) => {
    const review = await Review.findOne({ _id: req.params.reviewId })
    review.content = req.body.text;
    await review.save();

    res.json({ review })   
}

const deleteReview = async(req, res) => {
    try{
        const review = req.params.id;
        await Review.findByIdAndDelete(review);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
}

module.exports = { getUserReviews, editReview, deleteReview, getOneUserReview };