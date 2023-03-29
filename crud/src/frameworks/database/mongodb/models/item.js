const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
})

itemSchema.index({
  name: 1
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item
