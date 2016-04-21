'use strict'

const express = require('express')
const router = express.Router()
const models = require('../models')

router.route('/api/users')
  .get((req, res, next) => {
    return models.users.findAll()
      .then((users) => {
        return res.status(200).json(users)
      })
  })

module.exports = router
