const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title:{ type: String, required: true, unique: true},
  category:{ type: mongoose.SchemaTypes.ObjectId, ref:'Category' },
  content:{type: String}
},{
  timestamps: true
})

module.exports = mongoose.model('Article',schema)

