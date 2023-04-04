const { request } = require("express");

//manege requests with routes
module.exports = function(app){
    app.get('/', (req, response) => {
        response.json({"mensaje": "hola soy el main"});
    });

    app.get('/Products', (request,response) =>{
        response.json({"mensaje": "lista de productos"});
    });

    app.post('/Products', (request,response) =>{
        const NewObject = request.body;
        console.log(NewObject);

        response.json({"mensaje": "hola uwu"});
    });
};