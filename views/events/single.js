module.exports = (event) => {
  return {
    id: event.id,
    type: event.type,
    title: event.title,
    body: event.body,
    date: event.date,
    recurring: event.recurring,
    created_at: event.created_at,
    updated_at: event.updated_at,
    author: {
      id: event.author_id,
      firstname: event.author_firstname,
      lastname: event.author_lastname
    }
  }
}

