import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ObjectId } from 'mongoose';

import * as amqp from 'amqplib';

@Controller('api/v1/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  private channel;

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    await this.itemsService.create(createItemDto);
    await this.sendNotif('berhasil menambah data dengan nest');
    return {
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return await this.itemsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    await this.itemsService.update(id, updateItemDto);
    await this.sendNotif('berhasil mengubah data dengan nest');
    return {
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId) {
    await this.itemsService.remove(id);
    await this.sendNotif('berhasil menghapus data dengan nest');
    return {
      message: 'success',
    };
  }

  async onModuleInit() {
    const queue = 'send-notif-websocket2';
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();

    this.channel = channel;
  }

  async sendNotif(message) {
    // I'm using dyrect type

    const exchangeName = 'chat-exchange';
    const key = 'chat-key';

    const data = {
      message,
    };
    this.channel.assertExchange(exchangeName, 'direct', {
      durable: true,
    });

    this.channel.publish(exchangeName, key, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
  }
}
