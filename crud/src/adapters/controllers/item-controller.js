const create = require('../../application/use-cases/items/create')
const deleteById = require('../../application/use-cases/items/delete-by-id')
const findAll = require('../../application/use-cases/items/find-all')
const findById = require('../../application/use-cases/items/find-by-id')
const updateById = require('../../application/use-cases/items/update-by-id')
const config = require('../../config')

let itemRepository
if (config.databaseApp === 'mongodb') {
  itemRepository = require('../../frameworks/database/mongodb/repositories/itemRepository')
} else {
  itemRepository = require('../../frameworks/database/mysql/repositories/itemRepository')
}
const sendNotif = require('../../frameworks/events/send-notif')

module.exports = (sequelize, channel) => {
  let repository
  if (config.databaseApp === 'mongodb') {
    repository = itemRepository()
  } else {
    repository = itemRepository(sequelize)
  }

  const index = async (req, res, next) => {
    try {
      const data = await findAll(repository)

      return res.json(data)
    } catch (err) {
      next(err)
    }
  }

  const show = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await findById(repository, id)
      return res.json(item)
    } catch (err) {
      next(err)
    }
  }

  const store = async (req, res, next) => {
    try {
      await create(repository, req.body, channel)
      sendNotif(channel, 'terdapat item baru')

      return res.json({ message: 'success' })
    } catch (err) {
      next(err)
    }
  }

  const update = async (req, res, next) => {
    try {
      const { id } = req.params
      await updateById(repository, id, req.body)
      sendNotif(channel, 'terdapat item diubah')

      return res.json({ message: 'success' })
    } catch (err) {
      next(err)
    }
  }

  const drop = async (req, res, next) => {
    try {
      const { id } = req.params
      await deleteById(repository, id)
      sendNotif(channel, 'terdapat item dihapus')

      return res.json({ message: 'success' })
    } catch (err) {
      next(err)
    }
  }

  return {
    index,
    show,
    store,
    update,
    drop
  }
}
