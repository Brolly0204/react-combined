const crypto = require('crypto')
const { secret } = require('./config')

// 加密
function createHmac(context) {
  return crypto
    .createHmac('sha256', secret)
    .update(context)
    .digest('hex')
}

module.exports = {
  createHmac
}
