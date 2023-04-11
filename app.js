// call dependence express
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { databaseService } = require('./Services/databaseService');

const app = express();
let cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

//importing routes
require('./routes')(app, databaseService());

// link app to port
app.listen(3080,function(){
    console.log('App listening on port 3080!')
});