'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const env = require('../init/config').env || 'development'
const dbconf = require('../config/config.json')[env].db
const relations = require('./relations')
let sequelize
let db = {}

sequelize = new Sequelize(`${dbconf.dialect}://${dbconf.user}:${dbconf.password}@${dbconf.host}:${dbconf.port}/${dbconf.name}`)

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' && file !== 'relations.js')
  })
  .forEach((file) => {
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// setting databases relations based on relation.js file
relations(sequelize)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
