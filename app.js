'use strict'

const express = require('express')
const app = express()
const oauth_server = require('oauth2-server')
const body_parser = require('body-parser')
const routes = require('./routes/index')

app.use(body_parser.urlencoded({ extended: true }));

app.use(body_parser.json())

app.oauth = oauth_server({
  model: require('./models'),
  grants: ['password'],
  debug: true
})

app.all('/oauth/token', app.oauth.grant())

app.get('/', app.oauth.authorise(), function (req, res) {
  res.send('Secret area')
})

app.use(app.oauth.errorHandler())

app.use('/', routes)

module.exports = app
