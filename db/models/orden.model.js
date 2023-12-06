const { Model, DataTypes } = require('sequelize');

const PEDIDO_TABLE = 'pedidos';

const pedidoSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Agregar columna para identificar las pinturas de la orden
  pinturasOrden: {
    type: DataTypes.ARRAY(DataTypes.INTEGER), // Puedes usar otro tipo de datos dependiendo de tu modelo de PinturaModel
    allowNull: true
  },
};

class PedidoModel extends Model {
  static associate(models) {
    // Relación muchos a muchos con PinturaModel
    this.belongsToMany(models.PinturaModel, { through: 'PedidoPintura', foreignKey: 'pedidoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PEDIDO_TABLE,
      modelName: 'Pedido',
      timestamps: false
    };
  }
}

module.exports = { PEDIDO_TABLE, pedidoSchema, PedidoModel };
