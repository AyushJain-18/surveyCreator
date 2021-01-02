require('dotenv').config();

// packages 
const express       = require('express');
const passport      = require('passport');
const CookieSession = require('cookie-session')

// variables 
const app          = express();
const connectTODB  = require('./config/db.setup');

// routes
const testingRoutes = require('./routes/testting.routes') 

connectTODB();

// cookies configuration

app.use(CookieSession({
        maxAge: 30*24*60*60*1000,
        keys:[process.env.Cookie_Session_Key]
    }
))

app.use(passport.initialize());
app.use(passport.session());

// google auth configuration and routes
require('./config/passport-google-config');
require('./routes/google-auth-routes')(app);


// app.use(function (req, res, next) {
//     // Update views
//     req.session.views = (req.session.views || 0) + 1
   
//     // Write response
//     res.end(req.session.views + ' views');
//     next();
//   })
   


app.use('/', testingRoutes);

const PORT  = process.env.PORT || 5000 ;
app.listen(PORT, ()=> console.log('server is created on port', PORT))