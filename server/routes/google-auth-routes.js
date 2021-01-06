const passport = require('passport');

module.exports = (app) =>{
    app.get('/auth/google', 
            passport.authenticate('google' ,{scope: ['email', 'profile']})
          );
    app.get('/auth/google/callback', 
                passport.authenticate('google', {failureRedirect:'/error'}),
                (req, res) =>{
                    res.redirect(`${process.env.CLIENT_APP_ROUTES}/surveys`);
                }
            );

    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.redirect(`${process.env.CLIENT_APP_ROUTES}/`);
    })
}


// , successRedirect:`${process.env.CLIENT_APP_ROUTES}/surveys`