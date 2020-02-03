const express = require('express')

const app = express()

app.use(require('cors')())

app.use(express.json())

app.use('/public',express.static(__dirname + '/public'))

require('./routes/admin/router.js')(app)

require('./plugins/db.js')(app)

app.listen(3000,()=>{
  console.log('running......on port 3000')
})