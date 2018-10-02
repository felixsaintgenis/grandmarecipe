import express from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '../config/config';

require('../models/user')
const User = mongoose.model('users')

const router = express.Router()

const validateRegisterInput = require('../helpers/validation/register-validation');
const validateLoginInput = require('../helpers/validation/login-validation');

// @route GET api/users/register
// @description Register user
// @access public

router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({email: 'Email already exists'})
    } else {

      const avatar = gravatar.url(req.body.email, {
        s: '200', //Size
        r: 'pg', //Rating
        d: 'mm' //Default
      });

      const newUser = new User({name: req.body.name, email: req.body.email, avatar, name: req.body.name, password: req.body.password});

      //hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err)
            throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => console.log(err))
        })
      })

    }
  })
});

// @route GET api/users/login
// @description Login User / returning the token
// @access public

router.post('/login', (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email}).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({email: 'User not found'});
    }
    //check if the password is correct
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched

        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          favorites: user.favorites
        };

        //generate a token for signin
        jwt.sign(payload, config.secret, {
          expiresIn: 3600
        }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
      } else {
        return res.status(400).json({password: 'Password incorrect'});
      }
    });
  });
});

router.post('/:userid/:recipeid/favorite/add', (req, res) => {

  User.findById(req.params.userid, (err, user) => {
    if (err) {
      return res.send(err);
    };

    if (user.favorites.filter(item => item.toString() === req.params.recipeid).length) {

      const itemIndex = user.favorites.indexOf(req.params.recipeid)
      user.favorites.splice(itemIndex, 1);
      user.save();

    } else {
      user.favorites.push(req.params.recipeid);
      user.save();

    }
  })
});

router.get('/:userid/favorites',(req,res)=> {
   User.findById(req.params.userid)
   .populate('recipes')
   .exec((err, user) => {
     if(err){
       return res.send(err);
     }
     res.json(user);
   });
 });

// router.post('/like/:recetteId/:userId', (req, res) => {
//     const { recetteId, userId } = req.params;
//
//     Recette.findById(recetteId, (err, recette) => {
//         if (err) return console.log(err);
//
//         const { likedBy } = recette.recetteInfos;
//
//         if (!likedBy.includes(userId)) {
//             likedBy.push(userId);
//             recette.save();
//         } else {
//             const itemIndex = likedBy.indexOf(userId);
//             likedBy.splice(itemIndex, 1);
//             recette.save();
//         }
//         return res.json(recette);
//     });
// });

// { $push: { likes: req.params.recipeid } },
// (err, comment) => {
//     err ?  return res.send(err)
//         : res.json({ "message": "registration of your like successful" })

// @route GET api/users/current
// @description return the current user
// @access private

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json(req.user)
})

export default router;
