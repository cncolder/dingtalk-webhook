'use strict'
const dingtalk = require('../dingtalk')

module.exports = {
  ping (token, { zen }) {
    console.log(token, zen)
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
    const branch = ref.replace('refs/heads/', '')
    const branchlink = `${repolink}/git/tree/${branch}`
    const commitlist = commits
      .map(c => `> [[${c.sha.slice(0, 7)}]](${c.web_url}) ${c.short_message}`)
      .join('\n')

    return dingtalk.markdown(token, `${username}推送${branch}`, `
# Coding

[${username}](${userlink}) 推送分支 [${branch}](${branchlink})

${commitlist}
    `)
  }
}
