'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    
    static associate(models) {
      this.belongsTo(models.order,{foreignKey:'order_id'})
      this.belongsTo(models.product,{foreignKey:'product_id'})
    }
  };
  OrderProduct.init({
          order_id:{
              type: DataTypes.INTEGER(11),
              allowNull: false
          },
          product_id:{
            type: DataTypes.INTEGER(11),
            allowNull: false
          },
          quantity:{
            type: DataTypes.INTEGER(11),
            allowNull: false
          }
        },
        {
            sequelize, // This is the connection instance
            modelName: 'orderProduct',
            tableName: 'orders_products',
            timestamps: false 
        }     
  )
  return OrderProduct;
};