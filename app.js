const express = require('express')
const app = express()
const body_parser = require('body-parser')
const cors = require('cors')
const routes = require('routes/index')
const JWT = require('jsonwebtoken')
const config = require('settings')

require('init')

app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json())

// CORS
const corsOptions = {
  origin: '*',
  allowedHeaders: [
    'origin',
    'x-requested-with',
    'content-type',
    'accept',
    'authorization'
  ]
}

app.use(cors(corsOptions))

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
  if (req.headers.authorization) {
    JWT.verify(req.headers.authorization, config.salt, (err, decoded) => {
      if (err) return res.sendStatus(403)

      req.user_id = decoded.id
      next()
    })
  } else {
    return res.sendStatus(403)
  }
})

app.use('/', routes)

app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    console.error(err)
    res.status(err.code ? err.code : 500).send(err.toObject ? err.toObject() : err)
  }
})

module.exports = app
