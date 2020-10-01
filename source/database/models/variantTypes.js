'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VariantType extends Model {
    
  };
  VariantType.init({
          id:{
              type: DataTypes.INTEGER(11),
              allowNull: false,
              autoIncrement:true,
              primaryKey:true
          },
          name:{
            type: DataTypes.STRING(10),
            allowNull: false
          }
        },
        {
            sequelize, // This is the connection instance
            modelName: 'variantTypes',
            tableName: 'variant_types',
            timestamps: false 
        }     
  )
  return VariantType;
};