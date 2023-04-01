import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forRoot('mongodb://root:password@mongodb:27017/db_test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
