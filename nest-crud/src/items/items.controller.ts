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

@Controller('api/v1/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    await this.itemsService.create(createItemDto);
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
    return {
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId) {
    await this.itemsService.remove(id);
    return {
      message: 'success',
    };
  }
}
