import axios from "axios"
import fs from 'fs-extra'
import { exec, spawn } from "child_process";
var randomColor = ['#ef1a11', '#89cff0', '#660000', '#87a96b', '#e9f6ff', '#ffe7f7', '#ca86b0', '#83a3ee', '#abcc88', '#80bd76', '#6a84bd', '#5d8d7f', '#530101', '#863434', '#013337', '#133700', '#2f3641', '#cc4291', '#7c4848', '#8a496b', '#722f37', '#0fc163', '#2f3641', '#e7a6cb', '#64c987', '#e6e6fa'];
  const apiColor = randomColor[Math.floor(Math.random() * randomColor.length)];

const { FileIo, FileUgu, TelegraPh, AnonFiles, FileDitch, PomF2, Top4top } =
  await import(`../../lib/uploader.js?v=${Date.now()}`).catch((err) =>
    console.log(err)
  );
let handler = async (m, { q, conn, args, setReply, prefix, command }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");
    const isQuotedSticker = m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
    const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
    m.reply(mess.wait);
    const dia = (m.quoted?.text ? m.quoted : m).sender;
    const name = await conn.getName(dia);
    let teks = m.quoted ? m.quoted.text : q ? q : "";
    const avatar = await conn.profilePictureUrl(dia, "image").catch(_ => "https://telegra.ph/file/89c1638d9620584e6e140.png");

    if (isImage || isQuotedImage) {
      let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
      let anu = await TelegraPh(media);
      const json = {
        type: "quote",
        format: "png",
        backgroundColor: "apiColor",
        width: 512,
        height: 768,
        scale: 2,
        messages: [{
          entities: [],
          media: {
            url: anu
          },
          avatar: true,
          from: {
            id: [0, 4, 5, 3, 2, 7, 5, 9, 8, 1, 6, 10, 9, 7, 5, 3, 1, 2, 4, 6, 8, 0, 10].getRandom(),
            name,
            photo: {
              url: avatar
            }
          },
          text: `${teks}`,
          replyMessage: {}
        }]
      };
      const { data } = await axios.post("https://quotly.netorare.codes/generate", json, {
        headers: {
          "Content-Type": "application/json"
        }
      }).catch(e => e.response || {});
      if (!data.ok) throw data;
      const buffer = Buffer.from(data.result.image, "base64");
     conn.toSticker(m.chat, buffer, m)
      fs.unlinkSync(media);
    } else if (isQuotedSticker) {
      let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
      let ran = getRandomFile('.png');
      exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
        fs.unlinkSync(media);
        if (err) return setReply(err);
        let anuah = await TelegraPh(ran);
        const json = {
          type: "quote",
          format: "png",
          backgroundColor:  "apiColor",
          width: 512,
          height: 768,
          scale: 2,
          messages: [{
            entities: [],
            media: {
              url: anuah
            },
            avatar: true,
            from: {
              id: [0, 4, 5, 3, 2, 7, 5, 9, 8, 1, 6, 10, 9, 7, 5, 3, 1, 2, 4, 6, 8, 0, 10].getRandom(),
              name,
              photo: {
                url: avatar
              }
            },
            text:` ${teks}`,
            replyMessage: {}
          }]
        };
        const { data } = await axios.post("https://quotly.netorare.codes/generate", json, {
          headers: {
            "Content-Type": "application/json"
          }
        }).catch(e => e.response || {});
        if (!data.ok) throw data;
        const buffer = Buffer.from(data.result.image, "base64");
        conn.toSticker(m.chat, buffer, m)
        fs.unlinkSync(ran);
      });
    } else {
      const json = {
        type: "quote",
        format: "png",
        backgroundColor:  "apiColor",
        width: 512,
        height: 768,
        scale: 2,
        messages: [{
          entities: [],
          avatar: true,
          from: {
            id: [0, 4, 5, 3, 2, 7, 5, 9, 8, 1, 6, 10, 9, 7, 5, 3, 1, 2, 4, 6, 8, 0, 10].getRandom(),
            name,
            photo: {
              url: avatar
            }
          },
          text: `${teks}`,
          replyMessage: {}
        }]
      };
      const { data } = await axios.post("https://quotly.netorare.codes/generate", json, {
        headers: {
          "Content-Type": "application/json"
        }
      }).catch(e => e.response || {});
      if (!data.ok) m.reply(data);
      const buffer = Buffer.from(data.result.image, "base64");
      conn.toSticker(m.chat, buffer, m)
      /*
      let patth = await getRandom('.jpg') 
      let r = await UrlToPath(avatar,patth)
      let ava = await TelegraPh (patth).catch(_ => TelegraPh (patth))
      let data = https://mineApi/api/qc?text=${teks}&username=${name}&avatar=${ava}
      makeSticker(data,Sticker, StickerTypes)
      fs.unlinkSync(patth)
      */
    }
 
};
handler.help = ["sticker"];
handler.tags = ["tools"];
handler.command = ["qc", "qcstik"];

export default handler;




 





  /*

  let teks = m.quoted && m.quoted.q ? m.quoted.text : q ? q : "";
  if (!teks) return m.reply(`Cara Penggunaan ${prefix}qc teks`);
  const text = `${teks}`;
  const username = await conn.getName(m.quoted ? m.quoted.sender : m.sender);
  const avatar = await conn
    .profilePictureUrl(m.quoted ? m.quoted.sender : m.sender, "image")
    .catch(() => `https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`);

  const json = {
    type: "quote",
    format: "png",
    backgroundColor: "#FFFFFF",
    width: 700,
    height: 580,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: username,
          photo: {
            url: avatar,
          },
        },
        text: text,
        replyMessage: {},
      },
    ],
  };
  axios
    .post("https://bot.lyo.su/quote/generate", json, {
      headers: { "Content-Type": "application/json" },
    })
    .then(async (res) => {
      const buffer = Buffer.from(res.data.result.image, "base64");
      await conn.toSticker(m.chat, buffer, m);
 
    });

  */
