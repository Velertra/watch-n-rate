const User = require('../model/userModel');
const Feature = require('../model/featureModel');
const Review = require('../model/reviewModel');
const mongoose = require('mongoose');

const addReview = async (req, res) => {
    const { content, title, type, featureId } = req.body;
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
    }

    /* if (!user){
        res.status(400);
        throw new Error('user not found');
    } */

    res.json({ user })
}

const getFeatureInfo = async(req, res, next) => {
    const { title, type, featureId } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
    
    const favs = await user.populate('liked')
    console.log(favs)

    res.json({ favs: favs.liked })
   /*  if(!featureId){
        return res.status(401).json({ message: "Adding to Favorites failed" });
    } */

    /* const newFav = { title, type, featureId }
    user.favFeatures.push(newFav); */

}

/* const addFav = async(req, res, next) => {
    const { title, type, featureId } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
    

    if(!featureId){
        return res.status(401).json({ message: "Adding to Favorites failed" });
    }

    const newFav = { title, type, featureId }
    user.favFeatures.push(newFav);

    await user.save();
} */

const addToUserLiked = async(req, res, next) => {
    const { title, featureId, type } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
    const findFeature = await Feature.findOne({ title: req.body.title }, { featureId: req.body.featureId });
console.log(findFeature)
    if(findFeature) {
        try{
        if(!findFeature.liked?.includes(user._id)) {
            findFeature.liked.push(user._id);
            user.liked.push(findFeature);
            await findFeature.save();
            await user.save()
            res.status(200).json({ message: 'basic adding to favs' });
        } else {
            const updatedFeature = await Feature.findByIdAndUpdate(
                findFeature._id,
                { $pull: { liked: user._id } },
                { new: true }
            );
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $pull: { liked: findFeature._id } },
                { new: true }
            );
            console.log(updatedUser)
    
            await updatedFeature.save();
            await updatedUser.save();
            res.status(200).json({ message: 'adding as first liked in feature' });
        }
    } catch{
        console.error("Error writing new :", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    } else {
        try{
            const newFeature = new Feature({
                title: title,
                featureId: featureId,
                type: type,
                liked: user
            });
    
            await newFeature.save();
            user.liked.push(newFeature._id);
            await user.save();
            res.status(200).json({ message: 'Creating feature and adding to liked' });
        } catch(error) {
            console.error("Error adding to Favorites:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

const getFeatureReviews = async (req, res, next) => {
    
        const feature = await Feature.findOne({
            type: req.query.type,
            featureId: req.query.featureId
        }).populate({
            path: 'reviews',
            populate:{ 
             path: 'author',
             select: 'username'
         }   
        });

        if(!feature) {
            console.log('test')
            res.json(null)
        } else {
            res.json({ feature })
        }
        
    
   
    
    
    //const user = await User.findOne({ username: req.user.username });
    /* const feature = await Feature.find({
        $or: [
            { type: type},
            { featureId: featureId}
        ]
    }) */
    /* const reviews = await Review.find({ author: user._id}).populate({
        path: "feature"
    }); */

    
    //res.json({reviews})
}
 
module.exports = { addReview, addToUserLiked, getFeatureInfo, getFeatureReviews };


/*  */