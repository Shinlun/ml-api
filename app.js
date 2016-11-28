const express = require('express')
const app = express()
const body_parser = require('body-parser')
const routes = require('routes/index')

require('init')

app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json())

app.engine('js', (path, item, cb) => {
  const template = require(`${path}`)
  return Promise.resolve()
    .then(() => {
      return template(item)
    })
    .then((rendered_item) => {
      cb(null, rendered_item)
    })
    .catch(cb)
})

app.set('view engine', 'js')

app.use('/', routes)

module.exports = app
