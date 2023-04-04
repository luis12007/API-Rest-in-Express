const { request } = require("express");

//manege requests with routes
module.exports = function(app , databaseService){
    app.get('/', (req, response) => {
        response.json({"mensaje": "hola soy el main"});
    });

    app.get('/Products', (request,response) =>{
        databaseService.GetProducts()
        .then(products => {
            response.json(products);
        }).catch(e => {
            response.status(500).json({"mensaje": "peto unu"});
        });
    });

    app.post('/Products', (request,response) =>{
        const NewObject = request.body;
        console.log(NewObject);

        databaseService.CreateProduct(NewObject)
            .then(() => {
                response.json({"mensaje": "Funciono agregado"});
            }).catch(e => {
                response.status(500).json({"mensaje": "peto unu"});
            });

        
    });
};