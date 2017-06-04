const express = require('express')
const router = express.Router()
const JWT = require('jsonwebtoken')
const config = require('settings')

const UserDAO = require('models/userDAO')
const ClientError = require('errors').ClientError

router.route('/login')
  .post((req, res, next) => {
    if (!req.body.email || !req.body.password) throw new ClientError('CLIENT.MISSING_PARAMETERS', 400)

    return UserDAO.login(req.body.email, req.body.password)
      .then((user) => {
        user.token = JWT.sign({ id: user.id }, config.salt, {
          expiresIn: 86400
        })
        return res.status(200).render('users/logged', user)
      })
      .catch(next)
  })

router.route('/api/users')
  .get((req, res, next) => {
    return res.status(200).json('YES! GOOD USER! YES!')
  })

router.route('/logout')
  .get((req, res, next) => {
    delete req.user_id
    return res.sendStatus(200)
  })

module.exports = router
