const rewards = {
  exp: 50000,
  money: 49999,
  potion: 10,
  mythic: 3,
  legendary: 1,
};

const cooldown = 2592000000;
let handler = async (m, { usedPrefix }) => {
  if (global.db.data.chats[m.chat].rpg == false && m.isGroup)
    return conn.sendButton(
      m.chat,
      "❗ ᴏᴘᴛɪᴏɴs ʀᴘɢ ɢᴀᴍᴇ ᴅɪᴄʜᴀᴛ ɪɴɪ ʙᴇʟᴜᴍ ᴅɪɴʏᴀʟᴀᴋᴀɴ ᴏʟᴇʜ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ",
      wm,
      null,
      [["ᴇɴᴀʙʟᴇ", ".on rpg"]],
      m
    );
  let user = global.db.data.users[m.sender];

  if (new Date() - user.lastmonthly < cooldown)
    return m.reply(
      `ʏᴏᴜ'ᴠᴇ ᴀʟʀᴇᴀᴅʏ ᴄʟᴀɪᴍᴇᴅ *ᴍᴏɴᴛʜʟʏ ʀᴇᴡᴀʀᴅs*, ᴩʟᴇᴀsᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ғɪɴɪsʜ.

⏱️ ${(user.lastmonthly + cooldown - new Date()).toTimeString()}`.trim()
    );
  let text = "";
  for (let reward of Object.keys(rewards))
    if (reward in user) {
      user[reward] += rewards[reward];
      text += `➠ ${rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`;
    }
  m.reply(
    `🔖 ᴍᴏɴᴛʜʟʏ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :
${text}`.trim()
  );
  user.lastmonthly = new Date() * 1;
};
handler.help = ["monthly"];
handler.tags = ["rpg"];
handler.command = /^(monthly)$/i;
handler.register = true;
handler.group = true;
handler.cooldown = cooldown;
handler.rpg = true;
export default handler;
