import express from "express";
import {
  get_comments_by_userid,
  get_all_comment_of_a_recipie,
  delete_a_comment
} from "../controllers/postsController";

const router = express.Router();

// @route   GET api/posts/:id
// @desc    Get comments by user ID
// @access  Public

router.get("/:id", get_comments_by_userid);

// @route  GET api/posts/:recipeid/comments
// @desc    Get all comments of a recipie
// @access  Public

router.get("/:recipeid/comments", get_all_comment_of_a_recipie);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Public

router.delete("/delete/:id", delete_a_comment);

export default router;
