'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      this.hasMany(models.orderProduct)
      this.hasMany(models.variant)
      this.belongsTo(models.section,{foreignKey:'section_id'})
      this.belongsTo(models.category,{foreignKey:'category_id'})
    }
  };
  Product.init({
          id:{
              type: DataTypes.INTEGER(11),
              allowNull: false,
              autoIncrement:true,
              primaryKey:true
          },
          name:{
            type: DataTypes.STRING(100),
            allowNull: false
          },
          description:{
            type: DataTypes.STRING(200),
            allowNull: true
          },
          category_id:{
            type: DataTypes.INTEGER(11),
            allowNull: true
          },
          section_id:{
            type: DataTypes.INTEGER(11),
            allowNull: true
          },
          image:{
            type: DataTypes.STRING(200),
            defaultValue:'/images/products/defaultProduct.jpg',
          }
        },
        {
            sequelize, // This is the connection instance
            modelName: 'product',
            tableName: 'products',
            timestamps: true 
        }     
  )
  return Product;
};