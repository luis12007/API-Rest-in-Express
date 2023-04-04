const { request } = require("express");

//manege requests with routes
module.exports = function (app, databaseService) {
    app.get('/Products', (req, response) => {
        databaseService.GetProducts()
            .then(products => {
                response.json(products);
            }).catch(e => {
                response.status(500).json({ "mensaje": "peto unu" });
            });
    });


    app.get('/Products/:Nombre', (request, response) => {
        const Nombre = request.params.Nombre;
        databaseService.FindProducts(Nombre)
            .then(products => {
                response.json(products);
            }).catch(e => {
                response.status(500).json({ "mensaje": "peto unu" });
            });
    });

    app.post('/Products', (request, response) => {
        const NewObject = request.body;
        console.log(NewObject);

        databaseService.CreateProduct(NewObject)
            .then(() => {
                response.json({ "mensaje": "Funciono agregado" });
            }).catch(e => {
                response.status(500).json({ "mensaje": "peto unu" });
            });
    });

    app.put('/Products/:idinventario', (request, response) => {
        const PutObject = request.body;
        const params = request.params.idinventario;
        console.log(PutObject);
        console.log(params);

        databaseService.UpdateProduct(PutObject, params)
            .then(() => {
                response.json({ "mensaje": "Funciono agregado" });
            }).catch(e => {
                response.status(500).json({ "mensaje": "peto unu" });
            });
    });

    app.delete('/Products/:idinventario', (request, response) => {
        const idinventario = request.params.idinventario;
        databaseService.DeleteProduct(idinventario)
            .then(products => {
                response.json(products);
            }).catch(e => {
                response.status(500).json({ "mensaje": "peto unu" });
            });
    });

};