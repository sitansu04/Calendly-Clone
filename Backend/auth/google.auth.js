const passport = require("passport")
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth2").Strategy

passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://my-cal-com-backend.vercel.app/google/callback",
  passReqToCallback: true
}, (request, accessToken, refrestToken, profile, done) => {
  // console.log(profile);//! -------> Consoling profile in server
  return done(null, profile)
}))
