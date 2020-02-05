const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = new mongoose.Schema({
  username:{ type: String, required: true, unique: true},
  password: {
    type: String,
    select:false,
    required:true, 
    set(val){
    return bcrypt.hashSync(val, 10)
  }},
  nickname:{type: String,required: true}
})

module.exports = mongoose.model('Adminuser',schema)