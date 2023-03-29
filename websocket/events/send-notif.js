async function sendNotif(exchangeName, channel, io) {
  try {
    const queue = 'send-notif-websocket'
    const key = 'chat-key'

    channel.assertExchange(exchangeName, 'direct', {
      durable: true,
    })

    await channel.assertQueue(queue, {
      // exclusive true akan menghapus queue jika unsubscribe
      exclusive: false,
      // time to life
      arguments: {
        'x-message-ttl': 10000,
      },
    })

    // bind queue ke key
    channel.bindQueue(queue, exchangeName, key)

    console.log(`listening on queue ${queue} with key ${key}`)

    channel.consume(queue, async (data) => {
      const payload = JSON.parse(data.content.toString())
      console.log(payload)
      io.emit('chat message', payload?.message)

      // berikan sinyal sudah diterima
      channel.ack(data)
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendNotif
