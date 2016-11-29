const util = require('util')
const AbstractError = require('errors/AbstractError')

const createError = function (name) {
  const error = function (msg) {
    error.super_.call(this, msg, this.constructor)
  }
  util.inherits(error, AbstractError)
  error.prototype.name = name
  return error
}

module.exports.ClientError = createError('ClientError')
module.exports.DatabaseError = createError('DatabaseError')
module.exports.SessionError = createError('SessionError')
module.exports.UserError = createError('UserError')
