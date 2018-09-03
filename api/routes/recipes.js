import express from 'express';
import mongoose from 'mongoose';
import config from '../config/config';
import { populateUsers } from './posts'

require('../models/recipe')
require('../models/post')
require('../models/user')

const Recipe = mongoose.model('recipes')
const User = mongoose.model('users')
const Comment = mongoose.model('comment')

const router = express.Router()

// @route GET api/recipes/register
// @description Register user
// @access public

router.get('/',(req, res) => {
  Recipe.find({},(err,recipes)=>{
     if (err){
       res.send(err);
     }
     res.json(recipes);
   });
 });

 router.get('/:id',(req,res)=> {
    Recipe.findById(req.params.id)
    .populate('comments')
    .exec((err, recipe) => {
      if(err){
        res.send(err);
      }
      res.json(recipe);
    });
  });

  // @route GET api/users/login
  // @description Login User / returning the token
  // @access public

  router.post('/add', (req, res) =>  {
    const newRecipe = new Recipe({
      name: req.body.name,
      image_url: req.body.image_url,
      tags: req.body.tags,
      ingredients: req.body.ingredients,
      product_description: req.body.product_description,
      product_recipe: req.body.product_recipe,
      published_date: req.body.published_date,
    });
    newRecipe.save()
      .then(recipe => res.json(recipe))
      .catch(err => console.log(err))
});

router.post('/:recipeid/:userid/comment/create', (req, res) => {
    // Création du nouveau commentaire
    const newComment = new Comment({
      user: req.params.userid,
      recipe: req.params.recipeid,
      body: req.body.body,
      created_at: Date.now()
    });
    // sauvegarde du commentaire dans la collection
    newComment.save((err, comment) => {
        console.log(comment)
        if (err) { res.send(err) }

        // on trouve l'owner en question pour mettre à jour le tableau de commentaires
        Recipe.findByIdAndUpdate(
            req.params.recipeid,
            // MAJ du tableau de commentaire avec id du nouveau commentaire
            { $push: { comments: comment._id } },
            (err, comment) => {
                err ?  res.send(err)
                    : res.json({ "message": "a comment has been created" })

            })
          })
});

  // @route GET api/users/current
  // @description return the current user
  // @access private


export default router;
