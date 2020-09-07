'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
          id:{
              type: DataTypes.INTEGER(11),
              allowNull: false,
              primaryKey:true
          },
          first_name:{
            type: DataTypes.STRING(100),
            allowNull: false
          },
          last_name:{
            type: DataTypes.STRING(100),
            allowNull: false
          },
          email:{
            type: DataTypes.STRING(200),
            allowNull: false
          },
          password:{
            type: DataTypes.STRING(400),
            allowNull: false
          },
          role:{
            type: DataTypes.STRING(5),
            allowNull:false
          }
        },
        {
            sequelize, // This is the connection instance
            modelName: 'user',
            tableName: 'users',
            timestamps: false 
        }     
  )
  return User;
};