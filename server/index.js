const express = require('express')

const app = express()

app.set('SECRET','CHENYUE1995')

app.use(require('cors')())

app.use(express.json())

app.use('/public',express.static(__dirname + '/public'))

require('./routes/admin/router.js')(app)

require('./plugins/db.js')(app)   //连接数据库

app.listen(3000,()=>{
  console.log('running......on port 3000')
})