const mongoose = require('mongoose')
const { DB_URL } = require('../config')

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true }
)

const models = {
  user: {
    user: {
      type: String,
      require: true
    },
    pwd: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    avatar: String,
    desc: String, // 简介
    title: String, // 职位名称
    company: String, // 公司
    money: String // 期望工资
  },
  chat: {
    chatid: { type: String, require: true },
    read: { type: Boolean, require: true, default: false },
    from: {
      type: String,
      require: true
    },
    to: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true,
      default: ''
    },
    create_time: {
      type: Number,
      default: Date.now()
    }
  }
}

for (let k in models) {
  mongoose.model(k, new mongoose.Schema(models[k]))
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}
