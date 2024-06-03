const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/requireAuth");
const reviewController = require("../controllers/reviewController");

router.patch("/reviewlike", verifyToken, reviewController.reviewLike)

router.get("/getuserreviews", verifyToken, reviewController.getUserReviews);
router.get("/review/:mongoId", reviewController.getOneUserReview);
router.get("/getrecentreviews", reviewController.getRecentReviews)

router.put("/changereview/:reviewId", verifyToken, reviewController.editReview);

router.delete("/deletereview/:id", verifyToken, reviewController.deleteReview);

module.exports = router;