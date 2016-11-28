const express = require('express')
const router = express.Router()

const Login = require('mutations/users/login')

router.route('/login')
  .post((req, res, next) => {
    return Login(req.body)
      .then((user) => {
        return res.status(200).render('users/private', user)
      })
      .catch(next)
  })

router.route('/api/users')
  .get((req, res, next) => {
  })

module.exports = router
