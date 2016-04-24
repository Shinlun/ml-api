'use strict'

const express = require('express')
const router = express.Router()

const models = require('../models')
const Login = require('../mutations/users/login')

router.route('/login')
  .post((req, res, next) => {
    return Login(req.body)
      .then((user) => {
        return res.status(200).render(user)
      })
      .catch(next)
  })

router.route('/api/users')
  .get((req, res, next) => {
    return models.users.findAll()
      .then((users) => {
        return res.status(200).json(users)
      })
  })

module.exports = router
