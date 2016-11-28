const Db = require('models/Database')
const UserError = require('errors').UserError

module.exports = {
  getByEmail (email) {
    return Db.one('SELECT * FROM users WHERE email = ${email}', {
      email: email
    })
      .then((user) => {
        if (!user) throw new UserError('USERS.NOT_FOUND')

        return user
      })
  }
}
