'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    
    static associate(models) {
        this.belongsTo(models.user,{foreignKey:'user_id'})
      }
    
  };
  UserAddress.init({
          id:{
              type: DataTypes.INTEGER(11),
              allowNull: false,
              autoIncrement:true,
              primaryKey:true
          },
          user_id:{
            type: DataTypes.INTEGER(11),
            allowNull: false
          },
          calle:{
            type: DataTypes.STRING(50),
          },
          altura:{
            type: DataTypes.INTEGER(4),
          },
          piso:{
            type: DataTypes.INTEGER(2),
          },
          codigo_postal:{
              type: DataTypes.INTEGER(4)
          },
          localidad:{
            type: DataTypes.STRING(50),
          },
          provincia:{
            type: DataTypes.STRING(50),
          }
        },
        {
            sequelize, 
            modelName: 'userAddress',
            tableName: 'users_addresses',
            timestamps: false 
        }     
  )
  return UserAddress;
};