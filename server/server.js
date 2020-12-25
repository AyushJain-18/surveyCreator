const express           = require('express');
const passport          = require('passport');
const GoogleStrategy    = require('passport-google-oauth20').Strategy;  

const keys = require('./server/config/secretKeys')

const app = express();

passport.use(new GoogleStrategy(
        {   clientID     : keys.google_client_id,
            clientSecret : keys.google_client_secret,
            callbackURL  : '/auth/google/callback'
        }, (accessToken, refreshToken, profile, cb) => {

            console.log('accessToken',  accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile',      profile);
        } 
    ));

app.get('/auth/google', passport.authenticate('google' ,{scope: ['email', 'profile']}))
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT  = process.env.PORT || 5000 ;
app.listen(PORT, ()=> console.log('server is created on port', PORT))