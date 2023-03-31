import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
});

export interface Item {
  id: string;
  name: string;
  qty: number;
}
