const {Sequelize} = require ('sequelize');
const setUpModels = require('../../db/models');

const sequelize = new Sequelize('pinturas', 'postgres', 'victormanuel20001411', { //nombre de la base de datos, usuario y contraseña
    host: 'localhost',
    dialect: 'postgres',    
    port: 5433,
    logging: true
});

setUpModels(sequelize);

sequelize.sync();

module.exports = sequelize;