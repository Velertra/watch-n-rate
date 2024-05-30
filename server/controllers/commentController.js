const User = require("../model/userModel");
const Review = require("../model/reviewModel");
const Feature = require("../model/featureModel");
const Comment = require("../model/commentModel");

const addComment = async (req, res) => {
    const { title, text, reviewId, featureId, featureMongoId } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
    const review = await Review.findById( reviewId )
    const feature = await Feature.findById( featureMongoId );

    const newComment = new Comment({
        review: reviewId,
        user,
        comment: text,
        timestamp: new Date()
    })
  
    await newComment.save();
    review.comment.push(newComment._id)
    await review.save();
    
    res.json({text})
    /* 
    const user = await User.findOne({ username: req.user.username }, '-password');
    const feature = await Feature.findOne({ title: title }).populate('reviews');
    const newReview = new Review({
        author: user,
        content: content,
        timestamp: new Date()
    });
        
    if(!feature){
        const newFeature = new Feature({
            title: title,
            featureId: featureId,
            type: type,
        });

        await newFeature.save();
        newReview.feature.push(newFeature._id);
        await newReview.save();
        newFeature.reviews.push(newReview._id);
        user.reviews.push(newReview._id);
        await newFeature.save();
        await user.save();

    } else {
        await newReview.save();
        feature.reviews.push(newReview._id);
        await feature.save();
        //newReview.author.push(feature._id);
        newReview.feature.push(feature._id);

        await newReview.save();
    } */
}

const getReviewComments = async (req, res) => {
    //const user = await User.findOne({ username: req.user.username });
    
    const review = await Review.findById(req.params.review).populate({ path: 'feature' })

    const comments = await Comment.find({ review: req.params.review }).populate({ path: "user" });
    
    console.log(comments)
    res.json({comments})
}

const editComment = async (req, res, next) => {
    const comment = await Comment.findOne({ _id: req.params.commentId })
    comment.comment = req.body.text;
    await comment.save();

    res.json({ comment })   
}

const deleteComment = async(req, res) => {
    try{
        const comment = req.params.id;
        await Comment.findByIdAndDelete(comment);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
}

module.exports = { getReviewComments, editComment, deleteComment, addComment };