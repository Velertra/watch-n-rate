const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/requireAuth");
const reviewController = require("../controllers/reviewController");

router.post("/addreview", verifyToken, reviewController.addReview);

module.exports = router;