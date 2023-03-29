module.exports = async (repository) => {
  const data = await repository.findAll()
  return data
}
