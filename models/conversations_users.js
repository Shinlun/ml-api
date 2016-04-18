'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('conversations_users', {
    conversation_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'conversations',
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
    tableName: 'conversations_users'
  })
}
