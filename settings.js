const env = process.env.NODE_ENV.trim()

const config = {
  development: {
    Db: {
      host: 'localhost',
      user: 'ml_dev',
      password: 'ml_dev',
      port: 5432,
      database: 'ml_dev'
    },
    server: {
      port: 3000
    },
    salt: '24gc8zajdrt1n584212gfkjpmbv7yyu1499q65w3'
  }
}

module.exports = config[env]
