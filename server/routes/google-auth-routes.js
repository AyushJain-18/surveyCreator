const passport = require('passport');


module.exports = (app) =>{
    app.get('/auth/google', 
            passport.authenticate('google' ,{scope: ['email', 'profile']})
          );
    app.get('/auth/google/callback', 
                passport.authenticate('google', {
                    failureRedirect:'/error', 
                    successRedirect:process.env.NODE_ENV==='production'?`/surveys`: `${process.env.CLIENT_APP_ROUTES}/surveys`
                 }),
            );
}


// , successRedirect:`${process.env.CLIENT_APP_ROUTES}/surveys`