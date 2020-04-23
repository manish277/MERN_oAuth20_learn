
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');


passport.serializeUser((usee,done)=>{
  done(null,user.id)
})
passport.deserializeUser((is,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  })
})

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleSecretKey,
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existData) => {
      if (existData) {
        // console.log("User", profile.id)
      } else {
        new User({ googleId: profile.id }).save();
        console.log("Usersave ", profile)
      }
    });
  }
  )
);
