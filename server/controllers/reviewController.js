const User = require("../model/userModel");
const Review = require("../model/reviewModel");
const Feature = require("../model/featureModel");
const { Timestamp } = require("mongodb");


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

const getRecentReviews = async (req, res) => {
    const reviews = await Review.find({}).sort({ timestamp: -1 }).populate(
        [
            { path: 'feature' },
            { path: 'author' }
        ]
    );

    res.json({reviews})
}

const reviewLike = async (req, res) => {
    const user = await User.findOne({ username: req.user.username})
    const review = await Review.findById( req.body.review._id )
    
    if(review.likes.includes(user._id.toString())){
        const updatedLikes = await Review.findByIdAndUpdate(
            review._id,
            { $pull: { likes: user._id } },
            {new: true }
        );
        updatedLikes.save();
        res.status(200).json({ message: 'unliked review successfully' });
    } else {
        //req.body.review.likes.push(user._id)
        review.likes.push(user._id);
        review.save();
        res.status(200).json({ message: 'liked review successfully' });
    }
}

const editReview = async (req, res, next) => {
    const review = await Review.findOne({ _id: req.params.reviewId })
    review.content = req.body.text;
    await review.save();

    res.json({ review })   
}

const deleteReview = async(req, res) => {
    try{
        const review = await Review.findById(req.params.commentId);
        const user = await User.findOne({ username: req.user.username })
        if(review.author.includes(user._id)){
            await Review.findByIdAndDelete(review._id)
            res.status(200).json({ message: 'Review deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
}

module.exports = { getUserReviews, editReview, reviewLike, getRecentReviews, deleteReview, getOneUserReview };