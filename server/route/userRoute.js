const express = require("express");
const User = require("../model/userModel");
const router = express.Router();
const userController = require("../controllers/userController");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/requireAuth");

router.get("/sign-up", (req, res) => res.render("./ejs/sign-up-form.ejs"));

router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

router.get("/", (req, res) => {
    res.render("index", { user: req.user });
});


router.post("/sign-up", async (req, res, next) => {
    //console.log(req);
    try {
        bcrypt.hash(req.body.password, 10, async ( err,  hashedPassword) => {
             if(err){
                console.log(err);
            } 
            const user = new User({
                username: req.body.username,
                password: hashedPassword
              });
            const result = await user.save();
            console.log(result)
            res.redirect("/");
        })
    } catch(err) {
      return next(err);
    };
});

router.get("/getUserProfile", verifyToken, userController.getUserProfile);

router.post("/login", userController.login);
router.post("/followList", verifyToken, userController.followList)

module.exports = router;