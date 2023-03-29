const itemModel = require('../models/item')

const itemRepository = () => {
  const findAll = () => {
    return itemModel.find()
  }

  const findById = (id) => {
    return itemModel.findById(id)
  }

  const create = ({ name, qty }) => {
    return itemModel.create({ name, qty })
  }

  const updateById = (id, { name, qty }) => {
    return itemModel.findByIdAndUpdate(id, { name, qty })
  }

  const deleteById = (id) => {
    return itemModel.findByIdAndDelete(id)
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
