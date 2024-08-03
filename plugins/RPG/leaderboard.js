import { areJidsSameUser } from "baileys";
import fetch from "node-fetch";
const leaderboards = [
  "level",
  "exp",
  "limit",
  "money",
  "iron",
  "gold",
  "diamond",
  "emerald",
  "trash",
  "joinlimit",
  "potion",
  "petFood",
  "wood",
  "rock",
  "string",
  "common",
  "uncommon",
  "mythic",
  "legendary",
  "pet",
  "bank",
  "chip",
  "skata",
  "strength",
  "speed",
  "defense",
];

    let flaaa = [
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    //'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
]
    let imgr = flaaa.getRandom()




let handler = async (m, { conn, args, participants, usedPrefix, command }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return {
      ...value,
      jid: key,
    };
  });

  let leaderboard = leaderboards.filter(
    (v) => v && users.filter((user) => user && user[v]).length
  );
  let type = (args[0] || "").toLowerCase();
  const getPage = (item) =>
    Math.ceil(users.filter((user) => user && user[item]).length / 0);
  let wrong = `🔖 ᴛʏᴩᴇ ʟɪsᴛ :
${leaderboard
  .map((v) =>
    `
⮕ ${rpg.emoticon(v)} - ${v}
`.trim()
  )
  .join("\n")}
––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴛᴏ ᴠɪᴇᴡ ᴅɪғғᴇʀᴇɴᴛ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ:
${usedPrefix}${command} [type]
★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}${command} legendary`.trim();
  if (!leaderboard.includes(type))
    return await conn.reply(
      m.chat,
      "*––––『 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 』––––*\n" + wrong,
      m,
      {
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 1,
            title: "",
            thumbnail: await (await fetch(imgr + "leaderboard")).buffer(),
            renderLargerThumbnail: true,
            
            sourceId: botName,
            sourceUrl: "",
          },
        },
      }
    );
  let page = isNumber(args[1])
    ? Math.min(Math.max(parseInt(args[1]), 0), getPage(type))
    : 0;
  let sortedItem = users.map(toNumber(type)).sort(sort(type));
  let userItem = sortedItem.map(enumGetKey);
  // let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
  let text = `
🏆 ᴘᴇʀɪɴɢᴋᴀᴛ: ${userItem.indexOf(m.sender) + 1} ᴅᴀʀɪ ${userItem.length} ᴜsᴇʀ

                *• ${rpg.emoticon(type)} ${type} •*

${sortedItem
  .slice(page * 0, page * 5 + 5)
  .map(
    (user, i) =>
      `${i + 1}.*﹙${user[type]}﹚*- ${
        participants.some((p) => areJidsSameUser(user.jid, p.id))
          ? `${user.registered ? user.name : conn.getName(user.jid)} \nwa.me/`
          : "ғʀᴏᴍ ᴏᴛʜᴇʀ ɢʀᴏᴜᴩ\n @"
      }${user.jid.split`@`[0]}`
  ).join`\n\n`}
`.trim();
  return await conn.reply(m.chat, text, m, {
    contextInfo: {
      mentionedJid: [...userItem.slice(page * 0, page * 5 + 5)].filter(
        (v) => !participants.some((p) => areJidsSameUser(v, p.id))
      ),
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        title: "",
        thumbnail: await (await fetch(imgr + "Global Leaderboard")).buffer(),
        renderLargerThumbnail: true,
       
        sourceId: botName,
        sourceUrl: "",
      },
    },
  });
};
handler.help = ["leaderboard"].map((v) => v + " <item>");
handler.tags = ["xp"];
handler.command = /^(leaderboard|lb|peringkat)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;

function sort(property, ascending = true) {
  if (property)
    return (...args) =>
      args[ascending & 1][property] - args[!ascending & 1][property];
  else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
  if (property)
    return (a, i, b) => {
      return {
        ...b[i],
        [property]: a[property] === undefined ? _default : a[property],
      };
    };
  else return (a) => (a === undefined ? _default : a);
}

function enumGetKey(a) {
  return a.jid;
}

/**
 * Detect Number
 * @param {Number} x
 */
function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == "number" && !isNaN(number);
}