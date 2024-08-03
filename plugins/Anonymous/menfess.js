let handler = async (m, { conn, text, usedPrefix, command }) => {
conn.menfess = db.data.menfess //conn.menfess ? conn.menfess : {}
if (!text) return m.reply(`*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Wajan|Halo.`)
let [jid, name, pesan] = text.split('|');
if (jid.startsWith('0')) return m.reply('Gunakan format 62')
if ((!jid || !name || !pesan)) return m.reply(`*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Wajan|Halo.`)
jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
let data = (await conn.onWhatsApp(jid))[0] || {};
if (!data.exists) return m.reply('Nomer tidak terdaftar di whatsapp.')
if (jid == m.sender) return m.reply('tidak bisa mengirim pesan menfess ke diri sendiri.')
let mf = Object.values(conn.menfess).find(mf => mf.status === true)
if (mf) return
let id = `${m.senderNumber}-${data.jid.split('@')[0]}`
const talking = db.data.menfess[id]


if(talking) return m.reply('Pesan menfess kamu yang sebelumnya belom di balas,tunggu sampai dia balas pesan menfess kamu')


const contextInfo = {
forwardingScore: 1,
isForwarded: false,
containsAutoReply: true,
mentionedJid: [m.sender],
externalAdReply: {
title: `SECRET MENFES`,
//body:`Runtime ${transformText(runTime)} `,
mediaType: 1,
renderLargerThumbnail: true,
thumbnailUrl: 'https://telegra.ph/file/b306a62cea140a53d860a.jpg',
mediaUrl: global.myUrl,
},
};

    try {

let text = `Hai Kak, kamu menerima pesan Menfess nih.

Dari: *${name}*
Pesan:
${pesan}

Mau balas pesan ini kak? bisa kak. kakak tinggal ketik pesan kakak nanti saya sampaikan ke *${name}*

Atau bisa juga
Ketik Y untuk menerima menfess
Ketik N untuk menolak menfess`

await conn.sendMessage(data.jid, {contextInfo,text})
await sleep(1000)
m.reply('Berhasil mengirim pesan menfess.')
conn.menfess[id] = {
id,
dari: m.sender,
nama: name,
penerima: data.jid,
pesan: pesan,
status: false,
}
 

} catch (e) {
console.log(e)
m.reply('eror');
}
}
handler.tags = ['anonymous']
handler.help = ['menfess'].map(v => v + ' <nomor>|<nama>|<pesan>')
handler.command =/^(mfs|men(fes|fess)|con(fes|fess))$/i
handler.private = true

export default handler

