const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('../utilities/passport');
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
            { path: 'faved' }
        ]
    );
    /* const userWithFavs =  await user.populate('faved')*/

    if (!profileUser){
        res.status(400);
        throw new Error('user not found');
    }
    res.json({ profileUser })
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

module.exports = {signUpController, login, getUserProfile, followList};