const databaseService = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST,
            port : 3306,
            user : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB,
        },
        pool: {min: 0, max:10},
    });

    const table = 'inventario';

    const GetProducts = () => {
        return knex(table).select();
    };

    const FindProducts = (Params) => {
        return knex(table).select().where({Nombre: Params});
    };  

    const FindProductsById = (Params) => {
        return knex(table).select().where({idinventario: Params});
    };  

    const CreateProduct = ({Nombre, Cantidad, PrecioIndividual, PrecioCaja, DiaCompra, Caducidad}) => {
        return knex(table).insert({
            Nombre: Nombre,
            Cantidad: Cantidad,
            PrecioIndividual: PrecioIndividual,
            PrecioCaja: PrecioCaja,
            DiaCompra: DiaCompra,
            Caducidad: Caducidad
        });
    };

    const UpdateProduct = ({Nombre, Cantidad, PrecioIndividual, PrecioCaja, DiaCompra, Caducidad}, params) => {
        return knex(table).where({idinventario: params}).update({
            Nombre: Nombre,
            Cantidad: Cantidad,
            PrecioIndividual: PrecioIndividual,
            PrecioCaja: PrecioCaja,
            DiaCompra: DiaCompra,
            Caducidad: Caducidad
        });
    };

    const DeleteProduct = (params) => {
        return knex(table).where({idinventario: params}).delete();
    };


    return {GetProducts, CreateProduct, FindProducts, UpdateProduct , DeleteProduct, FindProductsById};
};

module.exports = {
    databaseService
};