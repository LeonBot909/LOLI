import fetch from "node-fetch"
import axios from 'axios'

let handler = async (m, {q,conn,args,setReply,command}) => {
if(!q) return m.reply("Masukan link twitter")
	setReply(mess.wait);
try {

  const { twitterdown  } = require("nayan-media-downloader")
  let res = await twitterdown (q)
 log(res)
  //let url = res.data[0].url
  //conn.sendMessage(m.chat, { video: { url } }, { quoted: m });
  let result = res.data.HD
log(result)
 conn.sendFile(m.chat, result, '', `Nih`, m)

  //conn.sendMessage(m.chat, { video: { url } }, { quoted: m });
 

} catch (err) {
throw err
}
    


}
handler.help = ["chatgpt"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = ['tw','twitter']

export default handler


 