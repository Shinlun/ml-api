const config = require('settings.js')
const crypto = require('crypto')

let hashPassword = (password) => {
  return crypto.createHash('sha1').update(config.salt + password).digest('hex')
}

let checkPassword = (password, hashed_password) => {
  return (hashed_password === hashPassword(password))
}

module.exports = {
  hashPassword: hashPassword,
  checkPassword: checkPassword
}
