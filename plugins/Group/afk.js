var handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    m.reply(`${m.pushname} Telah AFK

Alasan ➠ ${text ? ': ' + text : ''}`)
  }
  handler.help = ['afk']
  handler.tags = ['user']
  handler.command = /^afk$/i
  
  export default handler
