const util = require('util')
const i18n = require('i18next')

/**
 * @see http://dustinsenos.com/articles/customErrorsInNode
 */

const AbstractError = function (msg, code, constr) {
  Error.captureStackTrace(this, constr || this)
  this.message = msg || 'Error'
  this.code = code || 500
}

util.inherits(AbstractError, Error)

AbstractError.prototype.name = 'AbstractError'
AbstractError.prototype.toObject = function () {
  return {
    code: this.code,
    name: this.name,
    message: i18n.t(this.message)
  }
}

module.exports = AbstractError
