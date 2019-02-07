const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./router/user')
const { getModel } = require('./model')

const chatModel = getModel('chat')

const PORT = 7000
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket) {
  socket.on('sendmsg', function({ from, to, msg }) {
    const chatid = [from, to].sort().join('_')
    chatModel.create({ chatid, from, to, content: msg }, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
    // io.emit('recvmsg', data)
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/user', userRouter)

server.listen(PORT, () => console.log(`listening to ${PORT}`))
