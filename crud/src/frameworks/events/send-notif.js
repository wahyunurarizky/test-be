module.exports = async (channel, message) => {
  // I'm using dyrect type

  const exchangeName = 'chat-exchange'
  const key = 'chat-key'

  const data = {
    message
  }
  channel.assertExchange(exchangeName, 'direct', {
    durable: true
  })

  channel.publish(exchangeName, key, Buffer.from(JSON.stringify(data)), {
    persistent: true
  })
}
