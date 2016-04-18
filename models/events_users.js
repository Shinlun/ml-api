'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('events_users', {
    event_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'events_users'
  })
}
