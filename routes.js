const { request, response } = require("express");
const jwt = require('jsonwebtoken');

//manege requests with routes
module.exports = function (app, databaseService) {


    // creating a user token routes

    app.post('/Login', (request, response) => {
        const credentials = request.body;
        const user = {
            Nombre: "Belgiesv",
            Pass: "Churros2023"
        }
        
        if(credentials[0] == user[0] && credentials[1] == user[1]){
            jwt.sign({ user: user }, 'secretkey',{expiresIn: '60m'}, (err, token) => {
                response.json({
                    token
                })
            });
        }else
        response.status(500).json({ "mensaje": "credenciales incorrectas" });

        
    });

    function verifyToken(request, response, next) {
        const bearerHeader = request.headers['authorization'];


        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            request.token = bearerToken;
            next();
        } else {
            response.status(403).json({ "mensaje": "no viene el token" });

        }
    }


    //Rutas de post

    app.get('/Products', verifyToken, (req, response) => {
        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                response.status(403).json({ "mensaje": "no tienes token para hacer esta operacion" });
            } else {
                databaseService.GetProducts()
                    .then(products => {
                        response.json(products);
                    }).catch(e => {
                        response.status(500).json({ "mensaje": "peto unu" , authData});
                    });
            }
        })
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