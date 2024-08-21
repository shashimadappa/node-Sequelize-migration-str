'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cohort_events', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      cohort_id:{
        type: Sequelize.UUID,
        allowNull: false,
      },
      epic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lecture_hours:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inovate_hours:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      judging_hours:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      assigned_date: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the ENUM type first to avoid errors in some databases
    await queryInterface.dropTable('cohort_events');
  }
};
