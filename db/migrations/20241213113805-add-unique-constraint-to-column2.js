'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_column_name_constraint', // Optional: Name for the constraint
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('users', 'unique_column_name_constraint');
  }
};
