const {PinturaModel, pinturaSchema} = require('./pintura.model');
const {UserModel, userSchema} = require('./user.model');
const {PedidoModel, pedidoSchema} = require('./orden.model');



function setUpModels(sequelize){
PinturaModel.init(pinturaSchema, PinturaModel.config(sequelize));
UserModel.init(userSchema, UserModel.config(sequelize));
PedidoModel.init(pedidoSchema, PedidoModel.config(sequelize));

PinturaModel.belongsToMany(PedidoModel, { through: 'PedidoPintura', foreignKey: 'pinturaId' });
PedidoModel.belongsToMany(PinturaModel, { through: 'PedidoPintura', foreignKey: 'pedidoId' });

}
module.exports = setUpModels;