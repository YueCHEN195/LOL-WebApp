const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type: String, required: true, unique: true},
  img: {type: String },
  description: {type: String}
})

module.exports = mongoose.model('Item',schema)