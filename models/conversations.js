'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('conversations', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: 'uuid_generate_v4()',
      primaryKey: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'now()'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'now()'
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'conversations'
  })
}
