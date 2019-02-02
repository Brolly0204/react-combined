const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./router/user')

const app = express()
const PORT = 7000

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/user', userRouter)

app.listen(PORT, () => console.log(`listening to ${PORT}`))
