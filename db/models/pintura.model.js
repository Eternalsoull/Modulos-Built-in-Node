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
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nacimiento: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    fallecimiento: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    tecnica: {
        type: DataTypes.STRING,
        allowNull: false
    },
    altura: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    anchura: {
        type: DataTypes.NUMBER,
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
        type: DataTypes.NUMBER,
        allowNull: false
    },
    valoracion_usuarios: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
};

class PinturaModel extends Model{
    static associate(models){
        // this.belongsTo(models.UserModel, {foreignKey: 'user:id', as: 'User'});
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