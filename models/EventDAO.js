const Db = require('models/Database')

module.exports = {
  getById (id) {
    return Db.one(`
      SELECT e.id, e.type, e.title, e.body, e.date, e.recurring, e.created_at, e.updated_at, u.id as author_id, u.firstname  as author_firstname, u.lastname as author_lastname
      FROM events e
      INNER JOIN users u
      ON e.author_id = u.id
      WHERE e.deleted_at IS NULL AND e.visibility = 'public' AND e.id = $/id/
      `, {
        id: id
      })
      .then((event) => event)
  },

  getAll (limit = 10) {
    return Db.query(`
      SELECT e.id, e.type, e.title, e.body, e.date, e.recurring, e.created_at, e.updated_at, u.id as author_id, u.firstname  as author_firstname, u.lastname as author_lastname
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
      SELECT e.id, e.type, e.title, e.body, e.date, e.recurring, e.created_at, e.updated_at, u.id as author_id, u.firstname  as author_firstname, u.lastname as author_lastname
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
  },

  getByDate (from, to) {
    return Db.query(`
      SELECT e.id, e.type, e.title, e.body, e.date, e.recurring, e.created_at, e.updated_at, u.id as author_id, u.firstname as author_firstname, u.lastname as author_lastname
      FROM events e
      INNER JOIN users u
      ON e.author_id = u.id
      WHERE e.deleted_at IS NULL AND e.visibility = 'public' AND (date BETWEEN $/from/ AND $/to/ OR e.recurring = TRUE AND EXTRACT(MONTH FROM date) = $/month/ AND EXTRACT(YEAR FROM date) <= $/year/)
      ORDER BY date DESC
      `, {
        from: from,
        to: to,
        month: to.getMonth(),
        year: to.getFullYear()
      }
    )
      .then((events) => events)
  },

  create (authorId, type, title, body, date, recurring, visibility) {
    return Db.one(`
      INSERT INTO events (author_id, type, title, body, date, recurring, visibility) VALUES ($/author_id/, $/type/, $/title/, $/body/, $/date/, $/recurring/, $/visibility/) RETURNING id
      `, {
        author_id: authorId,
        type: type,
        title: title,
        body: body,
        date: date,
        recurring: recurring,
        visibility: visibility
      }
    )
      .then((result) => {
        return this.getById(result.id)
      })
  }
}
