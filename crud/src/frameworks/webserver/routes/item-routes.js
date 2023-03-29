const express = require('express')
const itemController = require('../../../adapters/controllers/item-controller')

const itemRoutes = (sequelize) => {
  const router = express.Router()
  const controller = itemController(sequelize)

  router.get('/', controller.index)
  router.get('/:id', controller.show)
  router.post('/', controller.store)
  router.patch('/:id', controller.update)
  router.delete('/:id', controller.drop)

  return router
}

module.exports = itemRoutes
