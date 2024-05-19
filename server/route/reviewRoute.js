const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/requireAuth");
const reviewController = require("../controllers/reviewController");

router.get("/getuserreviews", verifyToken, reviewController.getUserReviews);

module.exports = router;