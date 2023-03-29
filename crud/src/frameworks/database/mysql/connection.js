const { Sequelize } = require('sequelize')

const postgresConnection = (config) => {
  // Database Configuration...

  const sequelize = new Sequelize({
    host: config.database.sql.host,
    port: config.database.sql.port,
    username: config.database.sql.username,
    password: config.database.sql.password,
    database: config.database.sql.dbname,
    dialect: config.database.sql.dialect
  })

  sequelize
    .authenticate()
    .then(() => {
      console.log('database connected')
    })
    .catch((err) => {
      console.log(err)
    })

  return sequelize
}

module.exports = postgresConnection
