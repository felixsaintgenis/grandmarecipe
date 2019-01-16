import express from "express";
import mongoose from "mongoose";

const router = express.Router();

require("../models/user");
require("../models/post");

const Comment = mongoose.model("comment");

// GET comments by userid

exports.get_comments_by_userid = (req, res) => {
  Comment.findById(req.params.id)
    .populate("user")
    .exec((err, comment) => {
      if (err) {
        return res.send(err);
      }
      return res.json(comment);
    });
};

// GET all comments of a recipie

exports.get_all_comment_of_a_recipie = (req, res) => {
  Comment.find()
    .where("recipe")
    .equals(req.params.recipeid)
    .populate("user")
    .exec((err, comment) => {
      if (err) {
        return res.send(err);
      }
      return res.json(comment);
    });
};

// Delete a comment by id

exports.delete_a_comment = (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      comment.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ postnotfound: "No comment found" }));
};

export default router;
