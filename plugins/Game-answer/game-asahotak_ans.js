//import similarity from 'similarity'
const threshold = 0.72
export async function before(m,{conn}) {
    let id = 'asahotak-' + m.chat
    //if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hotak/i.test(m.quoted.text) || /.*hotak/i.test(m.text))
   
    conn.game = conn.game ? conn.game : {}
    //if (!(id in thconnis.game)) return m.reply('pertanyaan itu telah berakhir')
  //  if (m.quoted.id == conn.game[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(conn.game[id][3])
            delete conn.game[id]
            return m.reply('*Yah Menyerah :( !*')
        }
        let json = conn.game[id] ? JSON.parse(JSON.stringify(conn.game[id][1])) : ""
        // m.reply(JSON.stringify(json, null, '\t'))
        if (conn.game[id] && m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += conn.game[id][2]
            m.reply(`*Benar!*\n+${conn.game[id][2]} XP`)
            clearTimeout(conn.game[id][3])
            delete conn.game[id]
        } else if ( conn.game[id] && similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else if(conn.game[id])
            m.reply(`*Salah!*`)
    
    
}
export const exp = 0