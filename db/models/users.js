'use strict';
const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/database')
const bcrypt = require('bcrypt')
module.exports = sequelize.define('users' , 
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    registeredDate: {
      type: DataTypes.DATE
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        const hashPassword = bcrypt.hashSync(value , 12)
        this.setDataValue('password' , hashPassword)
      }
    },
    usertype: {
      type: DataTypes.ENUM('0' , '1') // 0 for Borrowers , 1 for Manger
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt:{
      type: DataTypes.DATE
    }
  } , {
    paranoid : true, // for soft-delete
    freezeTableName : true,
    modelName : 'users'
  }
)