const express = require('express')
const app = express()
const body_parser = require('body-parser')
const routes = require('routes/index')
const session = require('express-session')

require('init')

app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json())

app.use(session({
  secret: 'hmmmmnoodlesoup!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: app.get('env') === 'production'
  }
}))

// CORS
/* app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}) */

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

app.all('/api/*', (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    return res.sendStatus(403)
  }
})

app.use('/', routes)

app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    console.log(err)
    res.status(err.code).send(err.toObject())
  }
})

module.exports = app
