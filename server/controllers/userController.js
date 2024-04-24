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
        if(err) { /* console.log(next(err)) */ ;return next(err); }
        if(!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        //console.log(req.body);
        const { username, password } = req.body;
        const token = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7h'} )
            
        res.json({ token: token })

    })(req, res, next);
}

const getUser = async (req, res) => {
    const { userId } = req.params;
    
    const user = await User.findOne({ username: req.user.username}, '-password');
    console.log(user.favMoives)
    //console.log(req.user)

    if (!user){
        res.status(400);
        throw new Error('user not found');
    }
/*
    res.status(200).json({
        user:user
    }) */
}

const addMovie = async(req, res) => {
    const { userId } = req.params;

    const user = await User.findOne({ username: req.user.username }, '-password');

    user.favMoives.push(userId);

    await user.save();
}


module.exports = {signUpController, login, getUser, addMovie};