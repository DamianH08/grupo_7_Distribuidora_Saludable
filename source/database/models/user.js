'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      this.hasMany(models.sessionToken)
      this.hasMany(models.userAddress)
      this.hasMany(models.order)
    }
    
  };
  User.init({
          id:{
              type: DataTypes.INTEGER(11),
              allowNull: false,
              autoIncrement:true,
              primaryKey:true
          },
          first_name:{
            type: DataTypes.STRING(100),
            allowNull: false
          },
          last_name:{
            type: DataTypes.STRING(100),
            allowNull: false
          },
          email:{
            type: DataTypes.STRING(200),
            allowNull: false
          },
          password:{
            type: DataTypes.STRING(400),
            allowNull: false
          },
          role:{
            type: DataTypes.STRING(5),
            defaultValue:'user',
            allowNull:false
          },
          avatar:{
            type: DataTypes.STRING(100),
            defaultValue: 'avatar-default-1599514458920.jpg',
            allowNull: true
          },
        },
        {
            sequelize, 
            modelName: 'user',
            tableName: 'users',
            timestamps: false 
        }     
  )
  return User;
};