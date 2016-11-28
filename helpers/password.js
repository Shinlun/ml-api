'use strict'

const config = require('../init/config.js')
const crypto = require('crypto')

let hashPassword = (password) => {
  return crypto.createHash('sha1').update(config.salt + password).digest('hex')
}

let checkPassword = (password, hashed_password) => {
  console.log('password: ' + hashPassword('password'))
  return (hashed_password === hashPassword(password))
}

module.exports = {
  hashPassword: hashPassword,
  checkPassword: checkPassword
}
