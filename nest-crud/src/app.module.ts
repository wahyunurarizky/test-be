import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forRoot('mongodb://mongodb:27017/mydb_nest', {
      pass: 'password',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
