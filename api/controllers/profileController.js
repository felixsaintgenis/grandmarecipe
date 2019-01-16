import mongoose from "mongoose";

require("../models/user");
require("../models/profile");
const Profile = mongoose.model("profile");
const User = mongoose.model("users");

const validateProfileInput = require("../helpers/validation/profile-validation");

// GET the profile of the current user

exports.get_current_user_profile = (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .populate("favorites")
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

// GET all profiles

exports.get_all_profiles = (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
};

// POST information on your profile

exports.post_information_on_your_profile = (req, res) => {
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
          errors.handle = "That handle already exists";
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
};

// GET profile by handle

exports.get_profile_by_handle = (req, res) => {
  const errors = {};

  Profile.findOne({ _id: req.params.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

// DELETE your profile

exports.delete_your_profile = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
  });
};

// GET your favorites

exports.get_your_favorites = (req, res) => {
  Profile.find({ user: req.params.userid })
    .select({ favorites: { $slice: -3 }, _id: false })
    .populate("favorites")
    .then((favorites, err) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.json(favorites);
    });
};

exports.add_a_favorite_to_your_profile = (req, res) => {
  Profile.findOne({ user: req.params.userid }).then((profile, err) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    if (
      profile.favorites.filter(item => item.toString() === req.params.recipeid)
        .length
    ) {
      const itemIndex = profile.favorites.indexOf(req.params.recipeid);
      profile.favorites.splice(itemIndex, 1);
      profile.save().then(profile => res.json(profile));
    } else {
      profile.favorites.push(req.params.recipeid);
      profile.save().then(profile => res.json(profile));
    }
  });
};
