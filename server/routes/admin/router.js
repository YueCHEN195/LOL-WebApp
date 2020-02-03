module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const fs = require('fs')
  const util = require('util');
  const unlink = util.promisify(fs.unlink)

  function getUrlEnd(url){
    const index = url.lastIndexOf('\/')
    return url.substring(index + 1)
  }

  router.post('/',async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.get('/',async(req, res) => {
    let lists
    if(req.Model.modelName == 'Category'){
      lists = await req.Model.find().populate('parent')
    }else{
      lists = await req.Model.find()
    }
    res.send(lists)
  })

  router.get('/:id',async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  router.put('/:id',async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async(req, res) => {
    if(req.Model.modelName != 'Category'){
      const model = await req.Model.findById(req.params.id)
      await unlink(`${__dirname}/../../public/img/${getUrlEnd(req.baseUrl)}/${getUrlEnd(model.img)}`)
    }
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({ success: true})
  });

  app.use('/admin/api/manage/:resource',(req,res,next) => {
    const inflection = require('inflection')
    const modelName = inflection.classify(req.params.resource)
    req.Model = require('../../models/' + modelName + '.js')
    next()
  } ,router)
  
  //文件上传路由
  const multer = require('multer')
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadFolder = __dirname + '/../../public/img/' + req.params.resource
      cb(null, uploadFolder);    // 保存的路径，没有会报错！
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 原始名字 + 时间戳
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

  app.post('/admin/api/upload/:resource', upload.single('file'), async(req,res)=>{       //接收一个字段名为file的单文件，文件信息保存在req.file
    const file = req.file
    file.url = `http://localhost:3000/public/img/${req.params.resource}/${file.filename}`
    res.send(file)
  })
}