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
    const user = await User.findOne({ username: req.user.username }, '-password');
    /* const userWithFavs =  */await user.populate('faved')

    if (!user){
        res.status(400);
        throw new Error('user not found');
    }
    res.json({ user })
}

const followList = async (req, res, next) => {
    const user = await User.findOne({ username: req.user.username }, '-password');
    const userTwo = await User.findOne({ username: req.body.userTwo }, '-password');

    //console.log(user)
    if(!user){
        return res.status(401).json({ message: "Following user failed" });
    }

    //const follow = { title, type, featureId }
    user.following.push(userTwo._id);
    userTwo.followers.push(user._id);

    await user.save();
    await userTwo.save();
    //res.json({ user })
}

module.exports = {signUpController, login, getUserProfile, followList};