const express = require('express')
const router = express.Router()

const UserDAO = require('models/userDAO')
const ClientError = require('errors').ClientError

router.route('/login')
  .post((req, res, next) => {
    if (!req.body.email || !req.body.password) throw new ClientError('USERS.LOGIN.MISSING_PARAMETERS', 400)

    return UserDAO.login(req.body.email, req.body.password)
      .then((user) => {
        req.session.user = user
        return res.status(200).render('users/private', user)
      })
      .catch(next)
  })

router.route('/api/users')
  .get((req, res, next) => {
    return res.status(200).json('YES! GOOD USER! YES!')
  })

router.route('/logout')
  .get((req, res, next) => {
    req.session.destroy()
    return res.sendStatus(200)
  })

module.exports = router
