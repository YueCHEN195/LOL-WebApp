module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const fs = require('fs')
  const util = require('util');
  const unlink = util.promisify(fs.unlink)
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')

  function getUrlEnd(url){
    const index = url.lastIndexOf('\/')
    return url.substring(index + 1)
  }

  const auth = async (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
      return res.status(401).send({message:'需要授权，请登录'})
    }
    tokenDecode = jwt.verify(token, app.get('SECRET'))    //{{_id:xxxxxx}}
    const user = await AdminUser.findById(tokenDecode._id)
    if(!user){
      return res.status(401).send({message:'需要授权，请登录'})
    }
    next()
  }
  
  const resource = (req,res,next) => {
    const inflection = require('inflection')
    const modelName = inflection.classify(req.params.resource)
    req.Model = require('../../models/' + modelName + '.js')
    next()
  }


  router.post('/',async (req, res) => {
    try{
      const model = await req.Model.create(req.body)
      res.send(model)
    }catch(e){
        res.status(500).send({message: '请勿重复创建'})
      }
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
    if(req.Model.modelName == 'Hero' || req.Model.modelName == 'Item' ){      //删除文件的项目
      const model = await req.Model.findById(req.params.id)
      if(model.img){
        await unlink(`${__dirname}/../../public/img/${getUrlEnd(req.baseUrl)}/${getUrlEnd(model.img)}`)
      }
    }
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({ success: true})
  });

  app.use('/admin/api/manage/:resource',auth, resource, router)
  
  //文件上传路由
  const multer = require('multer')
  
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadFolder = __dirname + '/../../public/img/' + req.params.resource
      cb(null, uploadFolder);    // 保存的路径，不存在会报错！
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

  //login
  app.post('/admin/api/login', async(req,res)=>{
    const {username, password} = req.body
    const user = await AdminUser.findOne({username}).select('+password') //password不可查 findOne查不出来password
    if(!user){
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    const bcrypt = require('bcryptjs')
    if(bcrypt.compareSync(password, user.password) == false){
      return res.status(422).send({
        message:'密码错误'
      })
    }
    //pass
    const token = jwt.sign({_id: user._id }, app.get('SECRET'))
    res.send({token, nickname: user.nickname})
  })

  // app.use(async (err,req,res,next) => {
  //   res.status(500).send({
  //     message: '服务器错误'
  //   })
  // })
}