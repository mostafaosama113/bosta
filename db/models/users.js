'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database')
module.exports = sequelize.define('users' , 
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    registeredDate: {
      type: Sequelize.DATE
    },
    password: {
      type: Sequelize.STRING
    },
    usertype: {
      type: Sequelize.ENUM('0' , '1') // 0 for Borrowers , 1 for Manger
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt:{
      type: Sequelize.DATE
    }
  } , {
    paranoid : true, // for soft-delete
    freezeTableName : true,
    modelName : 'users'
  }
)