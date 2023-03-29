const express = require('express')
const cors = require('cors')

const expressConfig = (app) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
}

module.exports = expressConfig
