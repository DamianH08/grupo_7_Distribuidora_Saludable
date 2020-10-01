'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    
    static associate(models) {
      this.belongsTo(models.product,{foreignKey:'product_id',onDelete:'CASCADE'})
      this.hasMany(models.offer)
    }
  };
  Variant.init({
          id:{
              type: DataTypes.INTEGER(11),
              allowNull: false,
              autoIncrement:true,
              primaryKey:true
          },
          product_id:{
              type: DataTypes.INTEGER(),
              allowNull: false
          },
          name:{
            type: DataTypes.STRING(50),
            allowNull: false
          },
          price:{
            type: DataTypes.INTEGER(11),
            allowNull: false
          },
          stock:{
            type: DataTypes.INTEGER(11),
            allowNull: true
          }
        },
        {
            sequelize, // This is the connection instance
            modelName: 'variant',
            tableName: 'variants',
            timestamps: false 
        }     
  )
  return Variant;
};