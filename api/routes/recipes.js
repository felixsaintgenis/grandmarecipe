import express from 'express';
import mongoose from 'mongoose';
import config from '../config/config';

require('../models/recipe')
const Recipe = mongoose.model('recipes')

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
    Recipe.findById(req.params.id, (err, recipe) => {
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

  // @route GET api/users/current
  // @description return the current user
  // @access private


export default router;
