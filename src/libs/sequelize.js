const {Sequelize} = require ('sequelize');
const setUpModels = require('../../db/models');

const sequelize = new Sequelize('pinturas', 'postgres', 'victormanuel20001411', {
    host: 'localhost',
    dialect: 'postgres',    
    port: 5433,
    logging: true
});

setUpModels(sequelize);

module.exports = sequelize;