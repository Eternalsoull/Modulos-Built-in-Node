const {Model, DataTypes} = require('sequelize');

const PINTURA_TABLE = 'pinturas';

const pinturaSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nacimiento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fallecimiento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tecnica: {
        type: DataTypes.STRING,
        allowNull: false
    },
    altura: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    anchura: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    unidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    estilo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    colecciones: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valoracion_criticos: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    valoracion_usuarios: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
};

class PinturaModel extends Model{
    static associate(models){
        // this.belongsTo(models.UserModel, {foreignKey: 'user:id', as: 'User'});
        this.belongsToMany(models.PedidoModel, { through: 'PedidoPintura', foreignKey: 'pinturaId' });
    }

    static config(sequelize){ //envia la conexion a la base de datos
        return {
            sequelize,
            tableName: PINTURA_TABLE,
            modelName: 'Pintura',
            timestamps: false
        }
    }
}

module.exports = {PINTURA_TABLE, pinturaSchema, PinturaModel};