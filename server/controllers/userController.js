const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('../utilities/passport');
const User = require("../model/userModel");
const Feature = require('../model/featureModel')
require('dotenv').config()

const signUpController = async (req, res) => {
    const { username, password } = req.body;
    
    try{
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            const newMember = new User({
                username: username,
                password: hashedPassword,
            });
            await newMember.save();
        });
    } catch(error) {
        console.error("Error signing up:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const login = async (req, res, next) => {

    //const { username, password } = req.body;
    passport.authenticate("local", function(err, user, info) {
        if(err) { return next(err) }
        if(!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const { username, password } = req.body;
        const token = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7h'} )
            
        res.json({ token: token })

    })(req, res, next);
}

const getUserProfile = async (req, res, next) => {
    const profileUser = await User.findOne({ username: req.params.username }, '-password').populate(
        [
            { path: 'faved' },
            { path: 'reviews' },
            { path: 'faved' },            
        ]
    );
    /* const userWithFavs =  await user.populate('faved')*/

    if (!profileUser){
        res.status(400);
        throw new Error('user not found');
    }
    res.json({ profileUser })
}

const addToWatchList = async(req, res, next) => {
    const { title, featureId, type } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
    const findFeature = await Feature.findOne({ title: req.body.title }, { featureId: req.body.featureId });

    if(!findFeature) {
        try{
            const newFeature = new Feature({
                title: title,
                featureId: featureId,
                type: type,
                watchlist: user
            });
    
            await newFeature.save();
            user.watchlist.push(newFeature._id);
            await user.save();
            res.status(200).json({ message: 'created new feature in db and added to users watchlist' });
        } catch(error) {
            console.error("Error adding to Favorites:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

    } else if(!findFeature.watchlist || findFeature.watchlist.includes(user._id.toString())){
        const updatedFeature = await Feature.findByIdAndUpdate(
            findFeature._id,
            { $pull: { watchlist: user._id } },
            {new: true }
        );
        
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { watchlist: findFeature._id } },
            {new: true }
        );

        await updatedFeature.save();
        await updatedUser.save();
        
        res.status(200).json({ message: 'adding as first watchlist in the feature' });

    } else {
        const feature = await Feature.findOne({ _id: findFeature._id });
        if(!feature.watchlist.includes(user._id)) {
            feature.watchlist.push(user._id);
            user.faved.push(feature);
            await feature.save();
            await user.save()
            
            res.status(200).json({ message: 'added to existing watchlist' });
        } 
    }
}

const followList = async (req, res, next) => {
    const userOnSite = await User.findOne({ username: req.user.username }, '-password');
    const userProfile = await User.findOne({ username: req.body.userProfile }, '-password');

    if(!userOnSite){
        return res.status(401).json({ message: "Following user failed" });
    }
    
    if(userProfile.followers.includes(userOnSite._id.toString())){
            const updatedUserProfile = await User.findByIdAndUpdate(
                userProfile._id,
                { $pull: { followers: userOnSite._id } },
                {new: true }
            );
            const updatedUserOnSite = await User.findByIdAndUpdate(
                userOnSite._id,
                { $pull: { following: userProfile._id } },
                {new: true }
            );
            updatedUserProfile.save();
            updatedUserOnSite.save();
            res.status(200).json({ message: 'unfollowed successfully' });
        } else{
            userProfile.followers.push(userOnSite._id);
            userOnSite.following.push(userProfile._id);
            userProfile.save();
            userOnSite.save();
            res.status(200).json({ message: 'following successfully' })
        }
    }

module.exports = {signUpController, login, addToWatchList, getUserProfile, followList};