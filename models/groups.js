'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('groups', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: 'uuid_generate_v4()',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    visibility: {
      type: DataTypes.ENUM('public','private'),
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
    tableName: 'groups'
  })
}
