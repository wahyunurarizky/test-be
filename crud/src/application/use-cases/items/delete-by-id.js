const Joi = require('joi')
const AppError = require('../../../frameworks/helpers/app-error')

const validate = (payload) => {
  const schema = Joi.object({
    id: Joi.string().required()
  })

  const validate = schema.validate(payload)
  if (validate.error) throw new AppError(validate.error.message, 400)
}
module.exports = async (repository, id, fs) => {
  validate({ id })

  const item = await repository.findById(id)
  if (!item) {
    throw new AppError('data not found', 404)
  }

  return await repository.deleteById(id)
}
