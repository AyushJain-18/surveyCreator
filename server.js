const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send({'first': 'Ayush Jain'});
})

const PORT  = process.env.PORT || 5000 ;
app.listen(PORT, ()=> console.log('server is created on port', PORT))