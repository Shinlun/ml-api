'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('events_groups', {
    event_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    group_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id'
      }
    }
  }, {
    tableName: 'events_groups'
  })
}
