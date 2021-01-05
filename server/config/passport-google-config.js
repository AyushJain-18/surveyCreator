const passport          = require('passport');
const GoogleStrategy    = require('passport-google-oauth20').Strategy; 
const UserController    = require('../controller/user.controller') 



passport.use(new GoogleStrategy(
    {   clientID     : process.env.google_client_id,
        clientSecret : process.env.google_client_secret,
        callbackURL  : '/auth/google/callback',
        proxy        : true
    },async (accessToken, refreshToken, profile, done) => {
        let user = await UserController.isUserExist('profile_id', profile.id)
        if(user){
            done(null, user) // this user object we gona get while we are using seriaize user
        }else{
            let userData = {
                profile_id      : profile.id,
                display_name    : profile._json.name,
                email_id        : profile._json.email,
                profile_picture : profile._json.picture
            }
            let user = await UserController.cretaeNewUser(userData)
            done(null, user) // this user object we gona get while we are using seriaize user
        }
    } 
));

// this will store user id in session storage 
passport.serializeUser((user, done)=>done(null, user.id)) 


// here we are getting that id from session storage and then we will check is user exist in DB or not 
passport.deserializeUser( async (id, done)=>{
    let user = await UserController.findUserByID(id);
    done(null , user);
});

// deserializeUser ---> done() ---> will adee user to req.user