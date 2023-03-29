const mongoose = require('mongoose')

const mongoConnection = (config) => {
  console.log(config.database.mongo.url)
  mongoose
    .connect(config.database.mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('DB connection Successfully!')
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error)
    })
}

module.exports = mongoConnection
