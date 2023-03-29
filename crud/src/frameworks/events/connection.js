const amqplib = require('amqplib')

module.exports = async (config) => {
  // I'm using dyrect type

  const conn = await amqplib.connect(config.rabbitmqUrl)
  const channel = await conn.createChannel()

  return channel
}
