import yts from 'yt-search';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';
import axios from 'axios';

const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Gunakan contoh ${usedPrefix}${command} naruto blue bird`;

  await conn.reply(m.chat, "_「P R O C E S S 」_\n Sedang mencari dan mengunduh audio...", m);

  let search = await yts(text);
  let vid = search.videos[0];
  if (!search) throw 'Video tidak ditemukan, coba judul lain';
  let { title, thumbnail, timestamp, views, ago, url } = vid;
  let wm2 = 'Play 🎵';

  const response = await axios.get(`https://widipe.com/download/ytdl?url=${encodeURIComponent(url)}`);
  const mp3Url = response.data.result.mp3;

  const audioResponse = await axios.get(mp3Url, { responseType: 'stream' });

  const tmpDir = os.tmpdir();
  const audioFilePath = `${tmpDir}/${title}.mp3`;
  const writableStream = fs.createWriteStream(audioFilePath);

  await streamPipeline(audioResponse.data, writableStream);

  let audioMessage = {
    audio: {
      url: audioFilePath
    },
    mimetype: 'audio/mp4',
    fileName: `${title}`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: title,
        body: wm2,
        sourceUrl: url,
        thumbnailUrl: thumbnail
      }
    }
  };

  await conn.sendMessage(m.chat, audioMessage, { quoted: m });

  fs.unlink(audioFilePath, (err) => {
    if (err) {
      console.error(`Gagal menghapus file audio: ${err}`);
    } else {
      console.log(`File audio dihapus: ${audioFilePath}`);
    }
  });
};

handler.help = ['play'].map((v) => v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^(play)$/i;

export default handler;