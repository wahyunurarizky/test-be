const Joi = require('joi')
const AppError = require('../../../frameworks/helpers/app-error')

const validate = (payload) => {
  const schema = Joi.object({
    name: Joi.string().max(255),
    qty: Joi.number(),
    id: Joi.number().required()
  })

  // validate
  const validate = schema.validate(payload)
  if (validate.error) throw new AppError(validate.error.message, 400)
}

module.exports = async (repository, id, payload) => {
  const { name, qty } = payload
  validate({ name, qty, id })

  const item = await repository.findById(id)

  if (!item) throw new AppError('data not found', 404)

  await repository.updateById(id, { name, qty })
}
