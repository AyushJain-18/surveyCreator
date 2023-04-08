require('dotenv').config();

// packages 
const express       = require('express');
const passport      = require('passport');
const morgan        = require('morgan');
const path          = require("path")
const cors          = require('cors')
const CookieSession = require('cookie-session')

// variables 
const app          = express();
const connectTODB  = require('./services/db.setup');

// routes
const getUserDetails = require('./routes/getUser.routes');
const addMoreCredits = require('./routes/credits.routes');
const logoutRoute    = require('./routes/logout.routes');
const surveyRoutes   = require('./routes/surveys.routes') ;

connectTODB();

var corsOptions = {
    origin: process.env.CLIENT_APP_ROUTES,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// morgan 
app.use(morgan('combined'));
// Cors
app.use(cors(corsOptions));
// josn body
app.use(express.json());

// cookies configuration
app.use(CookieSession({
        maxAge: 30*24*60*60*1000,
        keys:[process.env.Cookie_Session_Key]
    }
))

app.use(passport.initialize());
app.use(passport.session());

// google auth configuration and routes
require('./services/passport-google-config');
require('./routes/google-auth-routes')(app);


// ------------------------------------ Routes ------------------------------------
app.use('/', getUserDetails);
app.use('/', addMoreCredits);
app.use('/', logoutRoute);
app.use('/', surveyRoutes);

//  --------------loading React for Production---------------
if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));  // this will server static client files
  app.use('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
  })
}

const PORT  = process.env.PORT || 5000 ;
app.listen(PORT, ()=> console.log('server is created on port', PORT))