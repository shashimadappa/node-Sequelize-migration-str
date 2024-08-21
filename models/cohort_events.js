module.exports = (sequelize, Sequelize) => {
    const cohortEvents = sequelize.define('cohort_events', {
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
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          },
    }, {
      underscored: true,
      timestamps: true,  // To handle created_at and updated_at automatically
    });

    
    cohortEvents.prototype.setAssociations = (models) => {
      cohortEvents.belongsTo(models.cohorts, { foreignKey: 'cohort_id' });
    };
  
    return cohortEvents;
  };
  