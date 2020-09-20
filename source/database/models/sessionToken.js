'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SessionToken extends Model {
    
    static associate(models) {
      this.belongsTo(models.user,{foreignKey:'user_id'})
    }
  };
  SessionToken.init({
          user_id:{
              type: DataTypes.INTEGER(11),
              allowNull: false,
              },
          token:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey:true
          }
        },
        {
            sequelize, // This is the connection instance
            modelName: 'sessionToken',
            tableName: 'session_tokens',
            timestamps: false 
        }     
  )
  return SessionToken;
};