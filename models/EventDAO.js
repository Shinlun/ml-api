const Db = require('models/database')

module.exports = {
  getAll (limit = 10) {
    return Db.query(`
      SELECT e.id, e.type, e.title, e.body, e.date, e.created_at, e.updated_at, u.firstname, u.lastname
      FROM events e
      INNER JOIN users u
      ON e.author_id = u.id
      WHERE e.deleted_at IS NULL AND e.visibility = 'public'
      ORDER BY created_at DESC LIMIT $/limit/
      `, {
        limit: limit
      }
    )
      .then((events) => events)
  },

  getByType (type, limit = 10) {
    return Db.query(`
      SELECT e.id, e.type, e.title, e.body, e.date, e.created_at, e.updated_at, u.firstname, u.lastname
      FROM events e
      INNER JOIN users u
      ON e.author_id = u.id
      WHERE e.deleted_at IS NULL AND e.visibility = 'public' AND e.type = $/type/
      ORDER BY created_at DESC
      LIMIT $/limit/
      `, {
        type: type,
        limit: limit
      }
    )
      .then((events) => events)
  }
}
