const AppError = require('../../frameworks/helpers/app-error')

const routeNotFoundController = (req, res, next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl

  next(
    new AppError(`url "${fullUrl}" not found with method [${req.method}]`, 404)
  )
}

module.exports = routeNotFoundController
