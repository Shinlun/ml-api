'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('groups_users', {
    group_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'groups',
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
    tableName: 'groups_users'
  })
}
