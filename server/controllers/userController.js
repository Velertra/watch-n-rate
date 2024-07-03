const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('../utilities/passport');
const User = require("../model/userModel");
const Feature = require('../model/featureModel')
require('dotenv').config()

const signUpController = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        bcrypt.hash(password, 10, async ( err,  hashedPassword) => {
            if(err){
                console.log(err);
            } 
            const user = new User({
                username,
                password: hashedPassword
            });
            await user.save();
            console.log(user)
            const token = jwt.sign({username} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7h' });
            res.json({ token });
        })
    } catch(err) {
      return next(err);
    };
}

const login = async (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err); 
            }
            if (!user) {
                return res.status(401).json({ message: "Authentication failed" });
            }
            
            const { username } = req.body;
            const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7h' });
            
            res.json({ token: token });
        })(req, res, next);
    } catch (error) {
        next(error);
    }
};

const authUser= async (req, res) => {
    console.log(req.user.username)
    if(req.user.username){
        const currentUser = await User.findOne({ username: req.user.username }, '-password').populate(
            [
                { path: 'liked' },
                { path: 'reviews' },
            ]
        );

        res.status(200).json({ currentUser });
    } else {
        res.status(400)
    }
    
}

const checkUsers = async (req, res, next) => {
    const { username } = req.params;
    
    const existingUser = await User.findOne({ username: username }, '-password');
    console.log(existingUser)
    if(existingUser){
        res.json( false );
    } else {
        res. json( true );
    }

}

const getUserProfile = async (req, res, next) => {
    const profileUser = await User.findOne({ username: req.params.username }, '-password').populate(
        [
            { path: 'liked' },
            { path: 'reviews' }, 
            { path: 'watchlist' }        
        ]
    );

    if (!profileUser){
        res.status(400);
        throw new Error('user not found');
    }
    res.json({ profileUser })
}

const getCurrentUserInfo = async(req, res) => {
    const currentUser = await User.findOne( {username: req.user.username} , '-password').populate(
        [
            { path: 'liked' },
            { path: 'reviews' },
        ]
    )

    if (!currentUser){
        res.status(400);
        throw new Error('user not found');
    }
    res.json({ currentUser })
}

const addToWatchList = async(req, res, next) => {
    const { title, featureId, type } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
    const findFeature = await Feature.findOne({ title: req.body.title }, { featureId: req.body.featureId });
    const feature = await Feature.findById( findFeature._id );

    if(!feature){
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
    } else if(!user.liked) {
        feature.watchlist.push(user._id);
        user.liked.push(feature);
        await feature.save();
        await user.save()
        
        
        res.status(200).json({ message: 'added to existing watchlist' });
    } else if(!user.liked.includes((feature._id).toString())) {
        user.liked.push(feature._id);
        await user.save()
        res.status(200).json({ message: 'basic adding to favs' });
    }
   /*  if(user.liked.includes(feature._id)){
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { watchlist: feature._id } },
            {new: true }
        );
        
        await updatedFeature.save();
        await updatedUser.save();
        
        res.status(200).json({ message: 'adding as first watchlist in the feature' });
    }
 */
    /* const { title, featureId, type } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');
    const findFeature = await Feature.findOne({ title: req.body.title }, { featureId: req.body.featureId });
    const feature = await Feature.findById( findFeature._id );

    console.log(feature)
    if(!feature) {
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
        
    } else if(!feature.watchlist){
        console.log(feature)
        feature.watchlist.push(user._id);
        user.liked.push(feature);
        await feature.save();
        await user.save()
        
        
        res.status(200).json({ message: 'added to existing watchlist' });

    } else {
        const updatedFeature = await Feature.findByIdAndUpdate(
            feature._id,
            { $pull: { watchlist: user._id } },
            {new: true }
        );
        
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { watchlist: feature._id } },
            {new: true }
        );
        
        await updatedFeature.save();
        await updatedUser.save();
        
        res.status(200).json({ message: 'adding as first watchlist in the feature' });
    } */
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

    const addWatchList = (req, res) => {
        const { variable } = req.body;
        
        res.status(200).send({ message: 'Accepted', variable });
    };
    

module.exports = {signUpController, login, authUser, checkUsers, getCurrentUserInfo, addToWatchList, addWatchList, getUserProfile, followList};