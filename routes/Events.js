const express = require('express')
const router = express.Router()

const ClientError = require('errors').ClientError
const EventDAO = require('models/eventDAO')

router.route('/api/events')
  .get((req, res, next) => {
    const limit = req.query.limit ? req.query.limit : null

    return (req.query.from && req.query.to
      ? EventDAO.getByDate(new Date(parseInt(req.query.from)), new Date(parseInt(req.query.to)))
      : (req.query.type
        ? EventDAO.getByType(req.query.type, limit)
        : EventDAO.getAll(limit)))
      .then((events) => {
        return res.status(200).render('events/collection', events)
      })
      .catch(next)
  })
  .post((req, res, next) => {
    if (!req.body.type ||
        !req.body.title ||
        !req.body.content ||
        !req.body.date ||
        !req.body.recurring) {
      throw new ClientError('CLIENT.MISSING_PARAMETERS', 400)
    }

    const visibility = req.body.visibility || 'public'
    const date = new Date(parseInt(req.body.date))
    const recurring = !!req.body.recurring

    return EventDAO.create(req.user_id, req.body.type, req.body.title, req.body.content, date, recurring, visibility)
      .then((event) => {
        return res.status(201).render('events/single', event)
      })
      .catch(next)
  })

module.exports = router
