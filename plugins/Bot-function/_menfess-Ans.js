const delay = time => new Promise(res => setTimeout(res, time))
export async function before(m,{conn}) {
const anonChat = db.data.anonymous
if (m.isGroup) return
conn.menfess = db.data.menfess //conn.menfess ? conn.menfess : {}
let mf = Object.values(conn.menfess).find(v => v.status === false && v.penerima == m.sender)
if (!mf) return

if(m.body.toLowerCase() == 'y'|| m.body.toLowerCase() == 'terima'){
log('Di terima')
let teks_menfes = `_Chat Sudah Terhubung Otomatis ✓_
_Sekarang kamu dapat mengirim pesan_
_Atau bisa kirim media seperti_
_Sticker/Audio/Video/Image/VN_

_Dilarang Spam Room Chat_
_Ketahuan : Banned_

_Ketik .keluar untuk Berhenti menfess_`
m.reply(teks_menfes)
let teks = `Orang yang kamu menfess telah menerima menfess kamu,
sekarang kamu sudah terhubung otomatis
dan dapat berbicara secara langsung`

conn.reply(mf.dari, teks, null)

let id = +new Date();
const obj = {
id,
a: m.sender,
b: mf.dari,
state: "CHATTING",
expired: "INFINITY",
};

anonChat.push(obj);
await sleep(2000)
delete conn.menfess[mf.id]

} else if(m.body.toLowerCase() == 'n'||m.body.toLowerCase() == 'tolak'){
log('Di tolak')
let txt = `Hallo kak, orang yang kamu menfess telah menolak menfess kamu\n\nYang sabar yaa awokawok`
await conn.reply(mf.dari, txt, null).then(() => {
m.reply(`Berhasil menolak menfess dari ${mf.nama}`)
delay(1500)
delete conn.menfess[mf.id]
//return !0
})

}   else {

let txt = `Hai kak, kamu menerima balasan nih.\n\nPesan yang kamu kirim sebelumnya:\n${mf.pesan}\n\nPesan balasannya:\n${m.text}\n`.trim();
await conn.reply(mf.dari, txt, null).then(() => {
m.reply('Berhasil Mengirim balasan.')
delay(1500)
delete conn.menfess[mf.id]
//return !0
})
}



















}

