const config = require('../../config')

const { username, password, dbname, host, port, dialect } = config.database

module.exports = {
  development: {
    username: username,
    password: password,
    database: dbname,
    host: host,
    port: port,
    dialect: dialect
  }
}
