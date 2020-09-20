'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    
    static associate(models) {
      this.hasMany(models.order)
    }
  };
  Store.init({
          id:{
              type: DataTypes.INTEGER(11),
              allowNull: false,
              autoIncrement:true,
              primaryKey:true
          },
          name:{
            type: DataTypes.STRING(50),
            allowNull: true
          },
          address:{
            type: DataTypes.STRING(100),
            allowNull: true
          }
        },
        {
            sequelize, // This is the connection instance
            modelName: 'store',
            tableName: 'stores',
            timestamps: false 
        }     
  )
  return Store;
};