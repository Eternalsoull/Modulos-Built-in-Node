const {Model, DataTypes} = require('sequelize');

const USER_TABLE = 'users';

const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
};

class UserModel extends Model{
    static associate(models){
        // this.belongsTo(models.UserModel, {foreignKey: 'user:id', as: 'User'});
    }

    static config(sequelize){ //envia la conexion a la base de datos
        return {
            sequelize,
            modelName: 'User',
            tableName: USER_TABLE,
            timestamps: false
        }
    }
}

module.exports = {USER_TABLE, userSchema, UserModel};