'use strict'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('relationships', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: 'uuid_generate_v4()',
      primaryKey: true
    },
    user1_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    user2_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    relationship: {
      type: DataTypes.ENUM('grandfather','grandmother','father','mother','son','daughter','brother','sister','husband','wife','boyfriend','girlfriend','cousin','other'),
      allowNull: false
    },
    other: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'relationships'
  })
}
