require('app-module-path/register')

const app = require('app')
const config = require('settings')

const sessions = []

app.listen(config.server.port, () => {
  console.log(`Server listening on port ${config.server.port}...`)
})
