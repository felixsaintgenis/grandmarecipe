import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/config";

require("../models/user");

const User = mongoose.model("users");

const validateRegisterInput = require("../helpers/validation/register-validation");
const validateLoginInput = require("../helpers/validation/login-validation");

// register user

exports.register_user = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

// Log user

exports.log_user = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email
  }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({
        email: "User not found"
      });
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
        jwt.sign(
          payload,
          config.secret,
          {
            expiresIn: 360000
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({
          password: "Password incorrect"
        });
      }
    });
  });
};

// Get current user

exports.get_current_user = (req, res) => {
  res.json(req.user);
};
