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

const addMovie = async(req, res, next) => {
    const { title, type, featureId } = req.body;
    const user = await User.findOne({ username: req.user.username }, '-password');

    if(!featureId){
        return res.status(401).json({ message: "Adding to Favorites failed" });
    }

    const newFav = { title, type, featureId }
    user.favFeatures.push(newFav);

    await user.save();
}

const getUser = async (req, res, next) => {
    const user = await User.findOne({ username: req.user.username }, '-password');
    
    if (!user){
        res.status(400);
        throw new Error('user not found');
    }
    res.json({ user })
}

module.exports = {signUpController, login, getUser, addMovie, getUser};