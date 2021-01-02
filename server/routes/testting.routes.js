const express = require('express');

const Routes  = express.Router();

//  this it to test our authenticate route , once authenticate we will have req.user. 
Routes.get('/api/getCurrentUser', (req, res)=>{
    // here we have created a property in session 
    req.session.views = (req.session.views|| 0) +1;
    console.log('req.session.views', req.session.views)
    res.status(200).send(req.user)
})

module.exports=Routes;