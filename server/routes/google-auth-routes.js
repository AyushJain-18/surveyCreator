const passport = require('passport');

module.exports = (app) =>{
    app.get('/auth/google', passport.authenticate('google' ,{scope: ['email', 'profile']}))
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.status(200).send('Successfully logOut')
    })
}
