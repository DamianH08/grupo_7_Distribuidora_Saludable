'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      this.belongsTo(models.store,{foreignKey:'store_id'})
      this.belongsTo(models.user,{foreignKey:'user_id'})
      this.hasMany(models.orderProduct)
    }

  };
  Product.init({
          id:{
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement:true,
            primaryKey:true
          },
          user_id:{
            type: DataTypes.INTEGER(),
            allowNull: false
          },
          store_id:{
            type: DataTypes.INTEGER(),
            allowNull: true
          },
          address_id:{
            type: DataTypes.INTEGER(),
            allowNull: true
          },
          status:{
            type: DataTypes.STRING(10),
            allowNull: false
          }
        },
        {
            sequelize, // This is the connection instance
            modelName: 'order',
            tableName: 'orders',
            timestamps: true 
        }     
  )
  return Product;
};