const server = (app, config) => {
  const { port, host } = config
  app.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
  })
}

module.exports = server
