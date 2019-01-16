import express from "express";
import passport from "passport";

import {
  register_user,
  log_user,
  get_current_user
} from "../controllers/usersController";

const router = express.Router();

// @route GET api/users/register
// @description Register user
// @access public

router.post("/register", register_user);

// @route GET api/users/login
// @description Login User / returning the token
// @access public

router.post("/login", log_user);

// @route GET api/users/current
// @description Get current user if authentificated
// @access private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  get_current_user
);

export default router;
