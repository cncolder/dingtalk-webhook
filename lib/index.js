'use strict'
const middleware = require('./middleware')

module.exports = middleware

if (!module.parent) {
  const Koa = require('koa')
  const body = require('koa-json-body')
  const port = process.env.PORT || 3000
  const app = new Koa()

  app.use(body({ limit: '3kb' }))
  app.use(middleware())

  app.listen(port, () => console.log(`Server runing at ::${port}`))
}
