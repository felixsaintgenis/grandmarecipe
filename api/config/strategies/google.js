import Strategy from "passport-google-oauth20";
import User from "../../models/User";
import keys from "../keys";

const { clientID, clientSecret, callbackURL } = keys.google;

const GoogleStrategy = new Strategy(
  {
    clientID,
    clientSecret,
    callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then(currentUser => {
      if (currentUser) done(null, currentUser);
      else {
        new User({
          displayName: profile.displayName,
          avatar: profile._json.image.url.slice(0, -6),
          // ? slice() -> Remove le "?sz=50" à la fin pour récupérer la taille originale de l'image
          email: profile._json.emails[0].value,
          googleId: profile.id
        })
          .save()
          .then(newUser => done(null, newUser));
      }
    });
  }
);

export default GoogleStrategy;
