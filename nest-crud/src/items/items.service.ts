import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto) {
    const newItem = new this.itemModel(createItemDto);
    await newItem.save();
  }

  async findAll() {
    return await this.itemModel.find().exec();
  }

  async findOne(id: ObjectId) {
    return await this.itemModel.findById(id).exec();
  }

  async update(id: ObjectId, updateItemDto: UpdateItemDto) {
    return await this.itemModel.findByIdAndUpdate(id, updateItemDto).exec();
  }

  async remove(id: ObjectId) {
    await this.itemModel.findByIdAndDelete(id).exec();
  }
}
