const Db = require('models/Database')
const UserError = require('errors').UserError
const passwd = require('helpers/password')

module.exports = {
  login (email, password) {
    return this.getByEmail(email)
      .then((user) => {
        if (!passwd.checkPassword(password, user.password)) throw new UserError('USERS.LOGIN.WRONG_PASSWORD', 403)

        return user
      })
  },

  getByEmail (email) {
    return Db.query('SELECT * FROM users WHERE email = $/email/', {
      email: email
    })
      .then((users) => {
        if (users.length === 0) throw new UserError('USERS.NOT_FOUND', 404)

        return users[0]
      })
  }
}
