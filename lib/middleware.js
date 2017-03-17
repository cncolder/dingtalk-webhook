'use strict'
const assert = require('assert')
const dingtalk = require('./dingtalk')

module.exports = ({ path = '/' } = {}) => {
  return async (ctx, next) => {
    if (ctx.method !== 'POST' || ctx.path !== path) return next()

    const { body } = ctx.request

    if (ctx.get('user-agent') === 'Coding.net Hook') {
      const coding = require('./services/coding')
      const event = ctx.get('x-coding-event')
      const { token } = body

      assert(['ping', 'push'].includes(event))

      await coding[event](token, body)
    } else if (ctx.get('x-send-from') === 'DaoCloud') {
      const daocloud = require('./services/daocloud')
      const { token } = ctx.query
      const {
        build: {
          build_type,
          status
        }
      } = body

      if (!['Pending', 'Enqueue'].includes(status)) {
        await daocloud[build_type](token, body)
      }
    }

    ctx.status = 200
  }
}
