// call dependence express
const express = require('express');

const app = express();

//importing routes
require('./routes')(app);

// link app to port
app.listen(3000,function(){
    console.log('App listening on port 3000!')
});