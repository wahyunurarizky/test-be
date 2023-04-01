import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketIOGateway } from './socketio.gateway';

@Module({
  controllers: [AppController],
  providers: [SocketIOGateway],
})
export class AppModule {}
