const passport = require('passport');


module.exports = (app) =>{
    app.get('/auth/google', 
            passport.authenticate('google' ,{scope: ['email', 'profile']})
          );
    app.get('/auth/google/callback', 
                passport.authenticate('google', {failureRedirect:'/error'}),
                (req, res) =>{
                    if(process.env.NODE_ENV ==="development"){
                        return res.redirect(`${process.env.CLIENT_APP_ROUTES}/surveys`)
                    }
                   return res.redirect(`/surveys`);
                }
            );
}


// , successRedirect:`${process.env.CLIENT_APP_ROUTES}/surveys`