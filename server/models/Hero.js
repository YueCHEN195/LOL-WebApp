const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type: String, required: true, unique: true},
  img: {type: String, required: true},
  title: {type: String, required: true},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category',required:true}],
  scores: {
    difficulty: {type: Number,required: true},
    ad: {type: Number,required: true},
    ap: {type: Number,required: true},
    df: {type: Number,required: true}
  },
  skills: [{
    icon: {type: String},
    name: {type: String},
    description: {type: String},
    tips:{type: String}
  }],
  items1:[{type: mongoose.SchemaTypes.ObjectId, ref:'Item'}],
  items2:[{type: mongoose.SchemaTypes.ObjectId, ref:'Item'}],
  stories:{type: String},
  battleTips:{type: String},
  partners: [{
    hero: {type: mongoose.SchemaTypes.ObjectId, ref:'Hero'},
    description: {type: String},
  }],
})

module.exports = mongoose.model('Hero',schema)