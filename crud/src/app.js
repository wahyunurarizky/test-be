const config = require('./config')
const express = require('express')
const routes = require('./frameworks/webserver/routes')
const server = require('./frameworks/webserver/server')
const expressConfig = require('./frameworks/webserver/express')
const mysqlConnection = require('./frameworks/database/mysql/connection')

// DEFINE EXPRESS
const app = express()
expressConfig(app)

// RUN SEQUELIZE
const sequelize = mysqlConnection(config)

// DEFINE ROUTES
routes(app, sequelize)

// RUN SERVER
server(app, config)
