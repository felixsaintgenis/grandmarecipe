import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

const router = express.Router()

require('../models/user')
require('../models/post')

const Comment = mongoose.model('comment')

router.get('/:id',(req,res)=> {
   Comment.findById(req.params.id)
   .populate('user')
   .exec((err, comment) => {
     if(err){
       return res.send(err);
     }
     res.json(comment);
   });
 });

  router.get('/:recipeid/comments',(req,res)=> {
     Comment.find()
     .where('recipe').equals(req.params.recipeid)
     .populate('user')
     .exec((err, comment) => {
       if(err){
         return res.send(err);
       }
       res.json(comment);
     });
   });

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
  router.delete(
    '/delete/:id',
    (req, res) => {
      Comment.findById(req.params.id)
          .then(comment => {
            // Delete
            comment.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({ postnotfound: 'No comment found' }));
      });

//
// router.post('/:recipeid/comments', function(req, res){
//
//   const commentFields = {};
//   commentFields.user = req.user.id;
//   commentFields.body = req.body.handle;
//   commentFields.created_at = new Date();
//
//
//
//        comment.save(function(err, comment) {
//            if (err) { return res.send(err); }
//
//            req.recipe.comments.push(comment);
//            req.recipe.save(function(err, recipe) {
//                if (err) { return res.send(err); }
//
//                res.json(comment);
//            });
//        });
//    });

export default router;
