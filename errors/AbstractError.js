const util = require('util')

/**
 * @see http://dustinsenos.com/articles/customErrorsInNode
 */

const AbstractError = function (msg, constr) {
  Error.captureStackTrace(this, constr || this)
  this.message = msg || 'Error'
}
util.inherits(AbstractError, Error)

AbstractError.prototype.name = 'AbstractError'
AbstractError.prototype.toObject = function () {
  return {
    name: this.name,
    message: this.message
  }
}

module.exports = AbstractError
