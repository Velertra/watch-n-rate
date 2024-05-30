const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/requireAuth");
const commentController = require("../controllers/commentController");

router.post("/addcomment", verifyToken, commentController.addComment);

router.get("/getcomments/:review", commentController.getReviewComments);

module.exports = router;