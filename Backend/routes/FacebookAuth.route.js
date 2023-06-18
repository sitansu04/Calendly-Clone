const passport = require("passport");
const { Usermodel } = require("../models/user.model");
const FacebookRouter = require("express").Router()
require("dotenv").config();
let HOST = "https://mycal-704.netlify.app"
// let HOST = "http://127.0.0.1:5500/MyCal.com-Frontend"

require("../auth/facebook.auth")

FacebookRouter.get("/auth", passport.authenticate("facebook", { scope: ['email', "public_profile", "user_photos"] }))

FacebookRouter.get("/auth/callback", passport.authenticate("facebook", {
    failureRedirect: "/facebook/auth/failure",
    successRedirect: "/facebook/auth/success"
}))



FacebookRouter.get("/auth/success", async (req, res) => {
    if (!req.user) { return res.redirect('/facebook/auth/failure'); }
    let email = req.user.emails[0].value
    let facebookData = {
        name: req.user.displayName,
        email: email,
        password: email,
        role: "Explorer"
    };
    console.log(facebookData);
    try {
        let user1 = await Usermodel.find({ email: facebookData.email });
        if (user1.length) {
            console.log("FoundInDB", user1[0])//!----> User Already Exists in DB  
            res.redirect(`${HOST}/success.html?Auth=Facebook&successId="${user1[0]._id}"`)
        } else {
            bcrypt.hash(facebookData.password, 5, async function (err, hash) {
                if (hash) {
                    facebookData.password = hash;
                    const instance = new Usermodel(facebookData);
                    await instance.save();// console.log("NewCreated", instance)//!----> New User Created in DB by google
                    res.redirect(`${HOST}/success.html?Auth=Facebook&successId="${instance._id}"`)
                } else {
                    console.log(err);
                    res.redirect(`${HOST}/failure.html?Auth=Facebook&failure="${"ErrorInGoogleFound"}"`)
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.redirect(`${HOST}/failure.html?Auth=Facebook&failure="${"ErrorOccured"}"`)
    }
})
FacebookRouter.get("/auth/failure", (req, res) => {

    res.redirect(`${HOST}?Auth=Facebook&failure=true`)
})



module.exports = FacebookRouter;