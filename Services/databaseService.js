const databaseService = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST,
            port : 3306,
            user : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB,
        }
    });

    const table = 'inventario';

    const GetProducts = () => {
        return knex(table).select();
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

    return {GetProducts, CreateProduct};
};

module.exports = {
    databaseService
};