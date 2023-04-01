import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

import { MessagePattern } from '@nestjs/microservices';
import * as amqp from 'amqplib';
import { SocketIOGateway } from './socketio.gateway';

@Controller()
export class AppController {
  constructor(private readonly server: SocketIOGateway) {} // private readonly server: Server, // private readonly appService: AppService,

  // @WebSocketServer()
  // private server: Server;

  @Get()
  getHello(@Res() res) {
    return res.send(`<!DOCTYPE html>
    <html>
    
    <head>
      <title>Socket.IO chat</title>
    </head>
    
    <body>
      <a href="https://github.com/wahyunurarizky">https://github.com/wahyunurarizky</a>
      <h4>List Messages</h4>
      <ul id="messages"></ul>
      <script src="/socket.io/socket.io.js"></script>
      <script>
        var socket = io();
    
        var messages = document.getElementById('messages');
    
        socket.on('chat message', function (msg) {
          var item = document.createElement('li');
          item.textContent = msg;
          messages.appendChild(item);
          window.scrollTo(0, document.body.scrollHeight);
        });
      </script>
    </body>
    
    </html>
    `);
  }

  @MessagePattern('chat-key')
  async consumeMessage(payload: any) {
    console.log('Received message:', payload);

    this.server.server.emit('chat message', payload?.message);
  }

  async onModuleInit() {
    const queue = 'send-notif-websocket2';
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();

    channel.assertExchange('chat-exchange', 'direct', {
      durable: true,
    });

    await channel.assertQueue(queue, {
      // exclusive true akan menghapus queue jika unsubscribe
      exclusive: false,
      // time to life
      arguments: {
        'x-message-ttl': 10000,
      },
    });
    // bind queue ke key
    channel.bindQueue(queue, 'chat-exchange', 'chat-key');

    console.log(`listening on queue ${queue} with key ${'chat-key'}`);

    await channel.consume(queue, (message) => {
      const content = JSON.parse(message?.content?.toString());
      console.log('RabbitMQ message:', content);
      this.consumeMessage(content);
      channel.ack(message);
    });
  }
}
