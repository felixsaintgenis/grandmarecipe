import { Strategy } from "passport-facebook";
import User from "../../models/User";
import keys from "../keys";

const { clientID, clientSecret, callbackURL, profileFields } = keys.facebook;

const FacebookStrategy = new Strategy(
  {
    clientID,
    clientSecret,
    callbackURL,
    profileFields
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id }).then(currentUser => {
      if (currentUser) done(null, currentUser);
      else {
        new User({
          displayName: profile._json.name,
          email: profile._json.email,
          image: profile._json.picture.data.url,
          facebookId: profile._json.id
        })
          .save()
          .then(newUser => done(null, newUser));
      }
    });
  }
);

export default FacebookStrategy;
