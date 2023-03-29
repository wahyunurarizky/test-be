const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const connectRabbitMQ = require('./events/connection')
const sendNotif = require('./events/send-notif')
require('dotenv').config()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  var query = socket.handshake.query
  var roomName = query.roomName
  if (roomName) socket.join(roomName)
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

connectRabbitMQ().then((channel) => {
  sendNotif('chat-exchange', channel, io)
})

const port = process.env.PORT
server.listen(port, '0.0.0.0', () => {
  console.log(`listening on *:${port}`)
})
