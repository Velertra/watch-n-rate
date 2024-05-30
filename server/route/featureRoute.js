const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/requireAuth");
const featureController = require("../controllers/featureController");
const userController = require("../controllers/userController");

router.get("/featureinfo", featureController.getFeatureInfo);
router.get("/getfeaturereviews", featureController.getFeatureReviews);

router.post("/addfav", verifyToken, featureController.addFav);
router.post("/addwatchlist", verifyToken, featureController.addWatchList);
router.post("/addreview", verifyToken, featureController.addReview);



module.exports = router;