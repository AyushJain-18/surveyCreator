const express = require('express');
const Routes  = express.Router();


Routes.get('/api/logout', (req, res)=>{
    req.logout();
    if(process.env.NODE_ENV==='production'){
        return res.redirect('/')    
    }
    return res.redirect(process.env.CLIENT_APP_ROUTES);    
})

module.exports = Routes;