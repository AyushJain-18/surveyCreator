const express = require('express');
const Routes  = express.Router();


Routes.get('/api/logout', (req, res)=>{
    req.logout();
    if(process.env.NODE_ENV ==="development"){
        return res.redirect(process.env.CLIENT_APP_ROUTES);
        
    }
    res.redirect('/')
})

module.exports = Routes;