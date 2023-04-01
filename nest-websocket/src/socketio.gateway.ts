import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway()
export class SocketIOGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('Socket.IO server initialized');
  }

  @SubscribeMessage('join')
  handleJoin(socket: Socket, room: string) {
    console.log(`Socket ${socket.id} joined room ${room}`);
    socket.join(room);
  }
}
