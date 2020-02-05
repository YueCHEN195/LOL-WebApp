const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{ type: String, required: true, unique: true},
  contents: [{
    img: {type: String},
    url: {type: String}
  }]
})

module.exports = mongoose.model('Swiper',schema)