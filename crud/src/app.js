const config = require('./config')
const express = require('express')
const routes = require('./frameworks/webserver/routes')
const server = require('./frameworks/webserver/server')
const expressConfig = require('./frameworks/webserver/express')
const mysqlConnection = require('./frameworks/database/mysql/connection')
const rabbitmqConnection = require('./frameworks/events/connection')
const mongoConnection = require('./frameworks/database/mongodb/connection')

;(async () => {
  // DEFINE EXPRESS
  const app = express()
  expressConfig(app)

  // RUN SEQUELIZE

  let sequelize
  if (config.databaseApp === 'mongodb') {
    mongoConnection(config)
  } else {
    sequelize = mysqlConnection(config)
  }

  // create channel rabbitemq
  const channel = await rabbitmqConnection(config)
  // DEFINE ROUTES
  routes(app, sequelize, channel)

  // RUN SERVER
  server(app, config)
})()
