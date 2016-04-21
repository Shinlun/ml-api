'use strict'

module.exports = function (sequelize) {
  const models = sequelize.models

  // users relations
  models.users.hasMany(models.comments, { foreignKey: 'author_id' })

  // comments relations
  models.comments.belongsTo(models.users, { as: 'author', foreignKey: 'author_id' })
}
