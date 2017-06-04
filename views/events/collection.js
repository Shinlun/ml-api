module.exports = (events) => {
  var formatted = []

  var keys = Object.keys(events).filter((k) => {
    return !isNaN(parseInt(k))
  })

  keys.forEach((key) => {
    const ev = events[key]

    formatted.push({
      id: ev.id,
      type: ev.type,
      title: ev.title,
      body: ev.body,
      date: ev.date,
      recurring: ev.recurring,
      created_at: ev.created_at,
      updated_at: ev.updated_at,
      author: {
        id: ev.author_id,
        firstname: ev.author_firstname,
        lastname: ev.author_lastname
      }
    })
  })

  return formatted
}
