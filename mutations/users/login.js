'use strict'

const models = require('../../models')
const passwd = require('../../helpers/password')

module.exports = (payload) => {
  if (!payload.email || !payload.password) throw new Error('USERS.LOGIN.MISSING_PARAMETERS')

  return models.users.findOne({ where: { email: payload.email } })
    .then((user) => {
      if (!user) throw new Error('USERS.LOGIN.WRONG_EMAIL')
      if (!passwd.checkPassword(payload.password, user.password)) throw new Error('USERS.LOGIN.WRONG_PASSWORD')

      return user
    })
}
