import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

require('../models/user');
require('../models/post');

const Comment = mongoose.model('comment');

// @route   GET api/posts/:id
// @desc    Get comments by user ID
// @access  Public

router.get('/:id', (req, res) => {
  Comment.findById(req.params.id)
    .populate('user')
    .exec((err, comment) => {
      if (err) {
        return res.send(err);
      }
      return res.json(comment);
    });
});

// @route  GET api/posts/:id
// @desc    Get comments by recipe
// @access  Public

router.get('/:recipeid/comments', (req, res) => {
  Comment.find()
    .where('recipe').equals(req.params.recipeid)
    .populate('user')
    .exec((err, comment) => {
      if (err) {
        return res.send(err);
      }
      return res.json(comment);
    });
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Public

router.delete('/delete/:id',
  (req, res) => {
    Comment.findById(req.params.id)
      .then((comment) => {
        comment.remove()
          .then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No comment found' }));
  });

export default router;
