// call dependence express
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

//importing routes
require('./routes')(app);

// link app to port
app.listen(3000,function(){
    console.log('App listening on port 3000!')
});