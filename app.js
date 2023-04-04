// call dependence express
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { databaseService } = require('./Services/databaseService');

const app = express();

app.use(bodyParser.json());

//importing routes
require('./routes')(app, databaseService());

// link app to port
app.listen(3000,function(){
    console.log('App listening on port 3000!')
});