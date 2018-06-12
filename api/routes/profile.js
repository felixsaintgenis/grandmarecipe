import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

const router = express.Router()

require('../models/user')
require('../models/profile')
const Profile = mongoose.model('profile')
const User = mongoose.model('users')

// @route GET api/profile
// @description Get current user profile information
// @access private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        res.status(404).json({ profile: 'there is no profile associated to this user'})
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err));
});

export default router;
