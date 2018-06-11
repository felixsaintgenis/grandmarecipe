import express from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

require('../models/user')
const User = mongoose.model('users')

const router = express.Router()

router.get('/test', (req, res) => res.json({msg: "User route work"})
);

router.post('/register',(req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({ email: 'Email already exists'})
      } else {

        const avatar = gravatar.url(req.body.email, {
          s: '200', //Size
          r: 'pg', //Rating
          d: 'mm' //Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          name: req.body.name,
          password: req.body.password
        });

        //hash the password
        bcrypt.genSalt(10, (err,salt) => {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
          })
        })

    }
  })
  });

export default router;
