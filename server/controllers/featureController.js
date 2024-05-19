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
    
    const favs = await user.populate('faved')
    console.log(favs)

    res.json({ favs: favs.faved })
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

const addFav = async(req, res, next) => {
    const { title, featureId, type } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
    const findFeature = await Feature.findOne({ title: req.body.title }, { featureId: req.body.featureId });

    if(!findFeature) {
        try{
            const newFeature = new Feature({
                title: title,
                featureId: featureId,
                type: type,
                faved: user
            });
    
            await newFeature.save();
            user.faved.push(newFeature._id);
            await user.save();
    
        } catch(error) {
            console.error("Error adding to Favorites:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

    } else {
        const feature = await Feature.findOne({ _id: findFeature._id });
        if(!feature.faved.includes(user._id)) {
            feature.faved.push(user._id);
            user.faved.push(feature);
            await feature.save();
            await user.save()
        } 
    }
}

const addWatchList = async(req, res, next) => {
    const { title, type, featureId } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');

    if(!featureId){
        return res.status(401).json({ message: "Adding to Favorites failed" });
    }

    const watchListPick = { title, type, featureId }
    user.watchList.push(watchListPick);

    await user.save();
}

const getFeatureReviews = async (req, res) => {
    
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

    res.json({ feature })
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
 
module.exports = { addReview, addFav, addWatchList, getFeatureInfo, getFeatureReviews };