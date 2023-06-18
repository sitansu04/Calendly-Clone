const passport = require("passport")
require("dotenv").config();
const FacebookStrategy = require("passport-facebook")

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "https://my-cal-com-backend.vercel.app/facebook/auth/callback",
    profileFields: ["email", "displayName"]
}, (accessToken, refrestToken, profile, done) => {
    // console.log(profile);//! -------> Consoling profile in server
    return done(null, profile)
}))
