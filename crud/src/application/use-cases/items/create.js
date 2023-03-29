const Joi = require('joi')
const AppError = require('../../../frameworks/helpers/app-error')

const validate = (payload) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    qty: Joi.number().required()
  })

  // validate
  const validate = schema.validate(payload)
  if (validate.error) throw new AppError(validate.error.message, 400)
}

module.exports = async (repository, payload) => {
  const { name, qty } = payload
  validate({ name, qty })

  await repository.create({ name, qty })
}
