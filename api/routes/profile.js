import express from "express";
import passport from "passport";
import {
  get_current_user_profile,
  get_all_profiles,
  post_information_on_your_profile,
  get_profile_by_handle,
  delete_your_profile,
  get_your_favorites,
  add_a_favorite_to_your_profile
} from "../controllers/profileController";

const router = express.Router();

require("../models/user");
require("../models/profile");

// @route GET api/profile
// @description Get current user profile
// @access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  get_current_user_profile
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public

router.get("/profiles", get_all_profiles);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  post_information_on_your_profile
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/:id/", get_profile_by_handle);

// @route   DELETE api/profile/
// @desc    Get profile by handle
// @access  Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  delete_your_profile
);

// @route   GET api/profile/:userid/myfavorites/
// @desc    Get your favorites
// @access  Public

router.get("/:userid/myfavorites/", get_your_favorites);

// @route   POST api/profile/:userid/:recipeid/favorite/add
// @desc    Add a favorite to your profile
// @access  Public

router.post("/:userid/:recipeid/favorite/add", add_a_favorite_to_your_profile);

export default router;
