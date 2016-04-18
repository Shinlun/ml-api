'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('comments', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: 'uuid_generate_v4()',
      primaryKey: true
    },
    author_id: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    event_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'comments'
  })
}
