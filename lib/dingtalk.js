'use strict'
const fetch = require('node-fetch')

module.exports = {
  /**
   * Post json message to dingtalk group robot
   * @param {string} token
   * @param {Object|string} body
   */
  post(token, body) {
    return fetch(
      `https://oapi.dingtalk.com/robot/send?access_token=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: typeof body === 'string' ? body : JSON.stringify(body)
      }
    )
  },

  /**
   * Send text message to dingtalk group robot
   * @param {string} token
   * @param {string} content
   */
  text(token, content) {
    return this.post(token, {
      msgtype: 'text',
      text: {
        content
      }
    })
  },

  /**
   * Send markdown message to dingtalk group robot
   * @param {string} token
   * @param {string} title
   * @param {string} text Markdown content
   */
  markdown(token, title, text) {
    return this.post(token, {
      msgtype: 'markdown',
      markdown: {
        title,
        text
      }
    })
  }
}
