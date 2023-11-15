const {PinturaModel, pinturaSchema} = require('./pintura.model');
function setUpModels(sequelize){
PinturaModel.init(pinturaSchema, PinturaModel.config(sequelize));
}

module.exports = setUpModels;