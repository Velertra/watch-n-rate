const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/requireAuth");
const featureController = require("../controllers/featureController");
const userController = require("../controllers/userController");

router.get("/featureinfo", featureController.getFeatureInfo);
router.get("/getfeaturereviews", featureController.getFeatureReviews);

router.post("/addtouserliked", verifyToken, featureController.addToUserLiked);
router.post("/addreview", verifyToken, featureController.addReview);

router.patch("/addtowatchlist", verifyToken, userController.addToWatchList);

module.exports = router;