import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

const router = express.Router()

require('../models/user')
require('../models/profile')
const Profile = mongoose.model('profile')
const User = mongoose.model('users')

const validateProfileInput = require('../helpers/validation/profile-validation');

// @route GET api/profile
// @description Get current user profile information
// @access private

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .populate('favorites')
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.skills) profileFields.skills = req.body.skills;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;


    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

router.post('/:userid/:recipeid/favorite/add', (req, res) => {

  Profile.findOne({user: req.params.userid}).then((profile, err) => {
    if (err) {
      console.log(err)
      return res.send(err);
    };

    if (profile.favorites.filter(item => item.toString() === req.params.recipeid).length) {
      const itemIndex = profile.favorites.indexOf(req.params.recipeid)
      profile.favorites.splice(itemIndex, 1);
      profile.save().then(profile => res.json(profile));

    } else {
      profile.favorites.push(req.params.recipeid);
      profile.save().then(profile => res.json(profile));
    }
  })
});

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

router.get('/:userid/myfavorites/', (req, res) => {

  Profile.find({user: req.params.userid}).select({ "favorites": { "$slice": -3 },'_id': false})
  .populate('favorites')
  .then((favorites, err) => {
    if (err) {
      console.log(err)
      return res.send(err);
    };
  
    res.json(favorites);
  })
});

export default router;

