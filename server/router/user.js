const express = require('express')
const {
  getModel
} = require('../model')
const {
  createHmac
} = require('../util')
const userModel = getModel('user')
const router = express.Router()

router.post('/update', (req, res) => {
  const userid = req.cookies['userid']
  if (!userid) {
    return res.json({
      code: 1
    })
  }
  const body = req.body
  userModel.findByIdAndUpdate(userid, body, function (err, doc) {
    if (!err) {
      console.log(doc)
      const data = Object.assign({}, {
        user: doc.user,
        type: doc.type
      }, body)
      res.json({
        code: 0,
        data
      })
    } else {
      res.json({
        code: 1
      })
    }
  })
})

router.get('/list', (req, res) => {
  const { type } = req.query
  userModel.find({type}, (err, doc) => {
    if (!err) {
      res.json({
        code: 0,
        data: doc
      })
    }
  })
})

router.post('/login', (req, res) => {
  const {
    user,
    pwd
  } = req.body
  userModel.findOne({
    user,
    pwd: createHmac(pwd)
  }, _filter, function (
    err,
    doc
  ) {
    if (err) {
      return res.json({
        code: 1,
        msg: '用户名或密码错误'
      })
    }
    res.cookie('userid', doc._id)
    return res.json({
      code: 0,
      data: doc
    })
  })
})

router.post('/register', (req, res) => {
  const {
    user,
    pwd,
    type
  } = req.body
  userModel.findOne({
    user
  }, function (err, doc) {
    if (doc) {
      return res.json({
        code: 1,
        msg: '用户名已经存在'
      })
    } else {
      userModel.create({
        user,
        type,
        pwd: createHmac(pwd)
      }, function (
        err,
        doc
      ) {
        if (err) {
          return res.json({
            code: 1,
            msg: '服务器错误'
          })
        }
        const {
          user,
          type,
          _id
        } = doc
        res.cookie('userid', _id)
        return res.json({
          code: 0,
          data: {
            user,
            type,
            _id
          }
        })
      })
    }
  })
})

const _filter = {
  pwd: 0,
  __v: 0
}
router.get('/info', (req, res) => {
  const {
    userid
  } = req.cookies
  if (!userid) {
    return res.json({
      code: 1,
      msg: '未登录'
    })
  }
  userModel.findById(userid, _filter, function (err, doc) {
    console.log(doc)
    if (err) {
      return res.json({
        code: 1,
        msg: '未登录'
      })
    }
    return res.json({
      code: 0,
      data: doc
    })
  })
})

module.exports = router
