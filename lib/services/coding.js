'use strict'
const dingtalk = require('../dingtalk')

module.exports = {
  ping (token, { zen }) {
    return dingtalk.markdown(token, zen, `**${zen}**`)
  },

  push (token, {
    ref,
    commits,
    repository: {
      web_url: repolink
    },
    user: {
      name: username,
      web_url: userlink
    }
  }) {
    let type = ''
    if (ref.startsWith('refs/heads/')) type = '分支'
    if (ref.startsWith('refs/tags/')) type = '标签'
    const name = ref
      .replace('refs/heads/', '')
      .replace('refs/tags/', '')
    const reflink = `${repolink}/git/tree/${name}`
    const commitlist = commits
      .map(c => `> [[${c.sha.slice(0, 7)}]](${c.web_url}) ${c.short_message}`)
      .join('\n')

    return dingtalk.markdown(token, `${username}推送${type}${name}`, `
# Coding

[${username}](${userlink}) 推送${type} [${name}](${reflink})

${commitlist}
    `)
  }
}
