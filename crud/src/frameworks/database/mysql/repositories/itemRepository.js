const item = require('../models/item')

const itemRepository = (sequelize) => {
  const itemModel = item(sequelize)

  const findAll = () => {
    return itemModel.findAll()
  }

  const findById = (id) => {
    return itemModel.findOne({ where: { id } })
  }

  const create = ({ name, qty }) => {
    return itemModel.create({ name, qty })
  }

  const updateById = (id, { name, qty }) => {
    return itemModel.update({ name, qty }, { where: { id } })
  }

  const deleteById = (id) => {
    return itemModel.destroy({ where: { id } })
  }

  return {
    findAll,
    findById,
    create,
    updateById,
    deleteById
  }
}

module.exports = itemRepository
