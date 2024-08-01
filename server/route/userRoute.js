const express = require("express");
const User = require("../model/userModel");
const router = express.Router();
const userController = require("../controllers/userController");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/requireAuth");
const useToken = require("../middleware/useAuth");

router.get("/sign-up", (req, res) => res.render("./ejs/sign-up-form.ejs"));


router.get("/authuser", verifyToken, userController.authUser);
router.get("/checkusers/:username", userController.checkUsers);
router.get("/searchthruusers/:user", userController.searchThruUsers);
router.get("/getpopularusers", userController.getPopularUsers);

router.get("/getcurrentuserinfo", verifyToken, userController.getCurrentUserInfo);
router.get("/getUserProfile/:username", useToken, userController.getUserProfile);

router.post("/sign-up", userController.signUpController);
router.post("add-fav", userController.addWatchList);
router.post("/login", userController.login);
router.post("/saveProfileImg", verifyToken, userController.saveProfileImg);
router.patch("/followList", verifyToken, userController.followList);
router.patch("/addtowatchList", verifyToken, userController.addToWatchList);



module.exports = router;