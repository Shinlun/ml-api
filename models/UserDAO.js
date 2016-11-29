const Db = require('models/Database')
const UserError = require('errors').UserError
const passwd = require('helpers/password')

module.exports = {
  login (email, password) {
    return this.getByEmail(email)
      .then((user) => {
        if (!passwd.checkPassword(password, user.password)) throw new UserError('USERS.LOGIN.WRONG_PASSWORD')

        return user
      })
  },

  getByEmail (email) {
    return Db.one('SELECT * FROM users WHERE email = $/email/', {
      email: email
    })
      .then((user) => {
        if (!user) throw new UserError('USERS.NOT_FOUND')

        return user
      })
  }
}
