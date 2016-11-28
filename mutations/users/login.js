const UserDAO = require('models/UserDAO')
const passwd = require('helpers/password')
const UserError = require('errors').UserError
const ClientError = require('errors').ClientError

module.exports = (payload) => {
  if (!payload.email || !payload.password) throw new ClientError('USERS.LOGIN.MISSING_PARAMETERS')

  return UserDAO.getByEmail(payload.email)
    .then((user) => {
      if (!passwd.checkPassword(payload.password, user.password)) throw new UserError('USERS.LOGIN.WRONG_PASSWORD')

      return user
    })
}
