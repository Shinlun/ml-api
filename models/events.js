'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('events', {
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
    type: {
      type: DataTypes.ENUM('birth','engagement','mariage','death','holidays','announcement','other'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
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
    tableName: 'events'
  })
}
