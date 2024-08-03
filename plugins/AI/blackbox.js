let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `• *Example :* ${usedPrefix + command} example code javascript `
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
let kemii = await ( await BalckBox(text)).response[0][0]
conn.reply(m.chat, kemii, m)
} catch(e) {
throw e
}

}
handler.help = ["blackbox"].map(a => a + " *<text>*")
handler.tags = ["ai"]
handler.command = ["blackbox"]
export default handler 

async function BalckBox(text) {
    return new Promise(async (resolve, reject) => {
        try {
            const salsa = await axios.post('https://www.useblackbox.io/chat-request-v4', {
                text: text,
                allMessages: [{
                    user: text
                }],
                stream: '',
                clickedContinue: false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Linux x86_64) Gecko/20130401 Firefox/71.3',
                }
            });
            resolve(salsa.data)
        } catch (e) {
            reject(e)
        }
    })
}