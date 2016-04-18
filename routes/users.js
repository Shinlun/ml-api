'use strict'

const express = require('express')
const router = express.Router()

router.route('/users')
  .get((req, res, next) => {
    return res.status(200).json({ hello: 'world' })
  })

module.exports = router
