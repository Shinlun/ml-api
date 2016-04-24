'use strict'

const express = require('express')
const app = express()
const oauth_server = require('oauth2-server')
const body_parser = require('body-parser')
const routes = require('./routes/index')
const i18next = require('i18next')

require('./init')

app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json())

app.oauth = oauth_server({
  model: require('./models'),
  grants: ['password'],
  debug: true
})

app.all('/oauth/token', app.oauth.grant())

app.get('/api/*', app.oauth.authorise(), function (req, res) {
  res.send('Secret area')
})

app.use(app.oauth.errorHandler())

app.engine('js', (path, item, cb) => {
  const template = require(`./views/${path}`)
  return Promise.resolve()
    .then(() => {
      return template(item)
    })
    .then((rendered_item) => {
      cb(null, rendered_item)
    })
    .catch(cb)
})

app.use('/', routes)

module.exports = app
