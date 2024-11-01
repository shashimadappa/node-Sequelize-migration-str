module.exports = (sequelize, DataTypes) => {
    const cohorts = sequelize.define('cohorts', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      format: {
        type: DataTypes.ENUM('mwf', 'tts'),
        allowNull: false,
      },
      holidays: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      sessions_per_day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sessions_time: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      underscored: true,
      timestamps: true,  // To handle created_at and updated_at automatically
    });
  
    return cohorts;
  };
  