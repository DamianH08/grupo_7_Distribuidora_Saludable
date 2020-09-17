'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    
    static associate(models) {
      this.hasMany(models.product)
    }
  };
  Category.init({
          id:{
              type: DataTypes.INTEGER(11),
              allowNull: false,
              autoIncrement:true,
              primaryKey:true
          },
          name:{
            type: DataTypes.STRING(50),
            allowNull: true
          }
        },
        {
            sequelize, 
            modelName: 'category',
            tableName: 'categories',
            timestamps: false
        }     
  )
  return Category;
};