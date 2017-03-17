'use strict'
const dingtalk = require('../dingtalk')

module.exports = {
  ci_build (token, {
    name,
    build_flow_id: id,
    build: {
      author,
      status,
      duration_seconds: duration
    }
  }) {
    const title = `${author}测试${name}`
    let text = `
# DaoCloud

${author} 触发CI ${name}

> 状态 ${status}
    `
    if (status !== 'Started') {
      text += `

> 耗时 ${duration} 秒`
    }

    return dingtalk.markdown(token, title, text)
  },

  image_build (token, {
    name,
    image,
    build: {
      author,
      status,
      duration_seconds: duration
    }
  }) {
    const title = `${author}构建${name}`

    let text = `
# DaoCloud

${author} 触发构建 ${name}

> 状态 ${status}
    `

    if (status !== 'Started') {
      text += `

> 耗时 ${duration} 秒
      `
    }

    if (status === 'Success') {
      text += `

> 镜像 ${image}
      `
    }

    return dingtalk.markdown(token, title, text)
  }
}
