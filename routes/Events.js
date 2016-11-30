const express = require('express')
const router = express.Router()

const EventDAO = require('models/eventDAO')

router.route('/api/events')
  .get((req, res, next) => {
    const limit = req.query.limit ? req.query.limit : null
    return (req.query.type
      ? EventDAO.getByType(req.query.type, limit)
      : EventDAO.getAll(limit))
      .then((events) => {
        return res.status(200).json(events)
      })
      .catch(next)
  })

module.exports = router
