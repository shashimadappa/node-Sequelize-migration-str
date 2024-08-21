'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cohorts', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      format: {
        type: Sequelize.ENUM('mwf', 'tts'),
        allowNull: false,
      },
      holidays: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      sessions_per_day: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('cohorts');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_cohorts_format";');
  }
};
