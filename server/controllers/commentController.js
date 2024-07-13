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
}

const getReviewComments = async (req, res) => {
    //const user = await User.findOne({ username: req.user.username });
    
    const review = await Review.findById(req.params.review).populate({ path: 'feature' })

    const comments = await Comment.find({ review: req.params.review }).populate({ path: "user" });
    
    
    res.json({comments})
}

const editComment = async (req, res, next) => {
    const user = await User.findOne({ username: req.user.username});
    const comment = await Comment.findOne({ _id: req.params.commentId })
    
    try{
        if(user._id.toString() === comment.user[0].toString()){
            //const comment = await Comment.findOne({ _id: req.params.commentId })
            comment.comment = req.body.text;
            await comment.save();
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }

    //res.json( 'test' )   


}

const commentLike = async (req, res) => {
    const user = await User.findOne({ username: req.user.username})
    const comment = await Comment.findById( req.body.comment._id )
    
    if(comment.likes.includes(user._id.toString())){
        const updatedLikes = await Comment.findByIdAndUpdate(
            comment._id,
            { $pull: { likes: user._id } },
            {new: true }
        );
        updatedLikes.save();
        res.status(200).json({ message: 'unliked review successfully' });
    } else {
        //req.body.review.likes.push(user._id)
        comment.likes.push(user._id);
        comment.save();
        res.status(200).json({ message: 'liked review successfully' });
    }
}

const deleteComment = async(req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        const user = await User.findOne({ username: req.user.username })
        
        if(comment.user.includes(user._id)){
            await Comment.findByIdAndDelete(comment._id)
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else{
            res.status(500).json({ message: 'Not your comment', error });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
}

module.exports = { getReviewComments, editComment, commentLike, deleteComment, addComment };