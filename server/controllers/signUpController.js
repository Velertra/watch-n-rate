const User = require("../model/signUpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('../utilities/passport');
require('dotenv').config()

const signUpController = async (req, res) => {
    const { username, password } = req.body;
    console.log("check")
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
            /* console.log(info) */
            return res.status(401).json({ message: "Authentication failed" });
        }
        //console.log(req.body);
        const { username, password } = req.body;
        const token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
            
        res.json({ token: token })

    })(req, res, next);

}

module.exports = {signUpController, login};