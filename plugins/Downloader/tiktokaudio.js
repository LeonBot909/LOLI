import fetch from "node-fetch";
import { miftah } from "../../lib/restApi.js";
import { getBuffer } from "../../lib/myfunc.js";
import fs from "fs-extra";
import { exec, spawn } from "child_process";

let handler = async (m, { q, conn, args, usedPrefix, command }) => {
  if (!q) return m.reply("Masukan link tiktok");
  if (!q.startsWith("http")) return m.reply("Masukan link tiktok");
  m.reply(wait);

  try {


    const { tikdown  } = require("nayan-media-downloader")
    let res = await tikdown (q)
    //log(res)
    //let url = res.data[0].url
    //conn.sendMessage(m.chat, { video: { url } }, { quoted: m });
   
    let {view,comment,play,share,duration,title,video,audio } = res.data


    let nana = await getBuffer(video)
    let ran = getRandomFile('.mp3')
    let ron = getRandomFile('.mp4')
    fs.writeFileSync(ron, nana)
    
    
    exec(`ffmpeg -i ${ron} -vn ${ran}`,async (err) => {
    fs.unlinkSync(ron)
    if (err) return setReply(`Err: ${err}`)
    let buffer453 = fs.readFileSync(ran)
     
    await conn.sendMessage(m.chat, { audio: buffer453, mimetype: 'audio/mpeg', fileName: title + '.mp3',ptt: false}, {quoted: m})
    fs.unlinkSync(ran)
    })

    
    
   // conn.sendMessage(m.chat, { video: { url:video }, caption: title }, { quoted: m });

  } catch(err) {
log(err)
throw(err)

    const data = new miftah();
    let res = await data.tiktokV2(q);
    //log(res)
    if (res.data.status !== undefined && res.data.status == "404")
      throw "Video not found!";
    let url = res.data.nowm
    await conn.sendMessage(m.chat, { 
        audio: { url}, 
        mimetype: 'audio/mpeg', 
        fileName: 'title.mp3',
        ptt: false
      }, {quoted: m})

  }
};
handler.help = ["downloader"];
handler.tags = ["internet"];
handler.command = ["ttaudio","ttmp3","tiktokaudio","tiktokmusik"];

export default handler;


































 










