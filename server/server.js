const express = require('express')
const userModel = require('./model/user')

const app = express()

app.get('/data', (req, res) => {
  userModel.find({}, function(err, doc) {
    if (!err) {
      res.json({
        code: 0,
        data: doc[0]
      })
    }
  })
})

app.get('/add', (req, res) => {
  const random = Math.round(Math.random() * 100)
  userModel.create(
    {
      user: 'wenli' + random,
      age: random
    },
    function(err, doc) {
      if (!err) {
        res.json({
          code: 0,
          data: doc
        })
      }
    }
  )
})

app.get('/removeAll', (req, res) => {
  userModel.deleteMany({}, function(err, doc) {
    if (!err) {
      res.json({
        code: 0,
        data: []
      })
    }
  })
})

const PORT = 7000
app.listen(PORT)
