const amqp = require('amqplib')
require('dotenv').config()

module.exports = async () => {
  connection = await amqp.connect(
    process.env.RABBITMQ_URL || 'amqp://localhost:5672'
  )
  channel = await connection.createChannel()

  return channel
}
