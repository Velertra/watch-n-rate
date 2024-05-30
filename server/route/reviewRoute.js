const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/requireAuth");
const reviewController = require("../controllers/reviewController");

router.get("/getuserreviews", verifyToken, reviewController.getUserReviews);
router.get("/review/:username/:title", verifyToken, reviewController.getOneUserReview);

router.put("/changereview/:reviewId", verifyToken, reviewController.editReview);

router.delete("/delete/:id", verifyToken, reviewController.deleteReview);

module.exports = router;