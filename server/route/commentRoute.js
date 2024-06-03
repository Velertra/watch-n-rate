const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/requireAuth");
const commentController = require("../controllers/commentController");

router.post("/addcomment", verifyToken, commentController.addComment);

router.patch("/commentlike", verifyToken, commentController.commentLike)

router.get("/getcomments/:review", commentController.getReviewComments);

router.put("/editcomment/:commentId", verifyToken, commentController.editComment)

router. delete("/deletecomment/:commentId", verifyToken, commentController.deleteComment)

module.exports = router;