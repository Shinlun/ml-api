const pg = require('pg-promise')()
const config = require('settings')

module.exports = pg(config.Db)
