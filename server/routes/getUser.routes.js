const express = require('express');
const authMiddelware= require('../middelware/authenticate.middelware').authenticateMiddelware
const Routes  = express.Router();

//  this it to test our authenticate route , once authenticate we will have req.user. 
Routes.get('/api/getCurrentUser', authMiddelware, (req, res)=>{
    // here we have created a property in session 
    req.session.views = (req.session.views|| 0) +1;
    res.status(200).send(req.user)
})

module.exports=Routes;