'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    
    static associate(models) {
      this.belongsTo(models.variant,{foreignKey:'variant_id'})
    }
  };
  Offer.init({
          variant_id:{
              type: DataTypes.INTEGER(11),
              allowNull: false
          },
          discount:{
            type: DataTypes.INTEGER(5)
          },
          start_date:{
            type: DataTypes.DATE()
          },
          finish_date:{
            type: DataTypes.DATE()
          },
          stock:{
            type: DataTypes.INTEGER(7)
          }
        },
        {
            sequelize, // This is the connection instance
            modelName: 'offer',
            tableName: 'offers',
            timestamps: false 
        }     
  )
  return Offer;
};