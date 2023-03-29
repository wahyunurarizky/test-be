const globalErrorController = require('../../../adapters/controllers/global-error-controller')
const routeNotFoundController = require('../../../adapters/controllers/route-not-found-controller')
const itemRoutes = require('./item-routes')

const routes = (app, sequelize) => {
  app.use('/api/v1/items', itemRoutes(sequelize))

  app.all('*', routeNotFoundController)

  app.use(globalErrorController)
}

module.exports = routes
