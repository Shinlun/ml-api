'use strict'

const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')
const basename = path.basename(module.filename)

router.get('/', (req, res) => {
  res.status(200).send('OK')
})

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach((file) => {
    router.use(require(path.join(__dirname, file)))
  })

module.exports = router
