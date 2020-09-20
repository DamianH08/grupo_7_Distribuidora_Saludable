'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    
    static associate(models) {
      this.hasMany(models.product)
    }
  };
  Section.init({
            id:{
                type: DataTypes.INTEGER(11),
                allowNull: false,
                autoIncrement:true,
                primaryKey:true
            },
            name:{
                type: DataTypes.STRING(50),
                allowNull: false
            },
        },
        {
            sequelize, // This is the connection instance
            modelName: 'section',
            tableName: 'sections',
            timestamps: false 
        }     
  )
  return Section;
};