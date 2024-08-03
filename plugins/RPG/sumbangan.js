let confirmation = {};
async function handler(m, { conn, args, usedPrefix, command }) {
  if (confirmation[m.sender]) return m.reply("Kamu sedang meminta sumbangan!");
  let user = global.db.data.users;
  function isNumber(x) {
    return !isNaN(x);
  }

  const count = args[0];
  if (!count) return m.reply("⚠️ Masukkan angka jumlah sumbangan.");
  if (isNaN(count)) return m.reply("⚠️ Jumlah sumbangan harus berupa angka.");
  let txt = `ᴀᴘᴀᴋᴀʜ ᴋᴀᴍᴜ ʏᴀᴋɪɴ ɪɴɢɪɴ ᴍᴇᴍʙᴇʀɪ sᴜᴍʙᴀɴɢᴀɴ\n✅ (Yes) ❌ (No)`;
  let confirm = `😁 Kak Minta Donasi\ncuma *${count}* aja.\n\n${txt}`;
  let { key } = await conn.reply(m.chat, confirm, m, {
    mentions: [m.sender],
  });
  confirmation[m.sender] = {
    sender: m.sender,
    message: m,
    count,
    key,
    pesan: conn,
    timeout: setTimeout(
      () => (
        conn.sendMessage(m.chat, { delete: key }), delete confirmation[m.sender]
      ),
      60 * 1000
    ),
  };
}

handler.before = async (m) => {
  if (m.isBaileys) return;
  if (!(m.sender in confirmation)) return;
  if (!m.text) return;
  let { timeout, sender, message, count, key, pesan } = confirmation[m.sender];
  if (m.id === message.id) return;
  let user = global.db.data.users[m.sender];
  let _user = global.db.data.users[sender];

  if (/(✔️|y(es)?)/g.test(text.toLowerCase())) {
    if (m.sender !== sender) {
      user.money -= count * 1;
      _user.money += count * 1;
      m.reply(
        `✨ Terima kasih!\n${
          m.name.split("\n")[0]
        } telah memberi sumbangan sebesar *${count}*`
      );
      pesan.sendMessage(m.chat, { delete: key });
      clearTimeout(timeout);
      delete confirmation[sender];
    } else {
      await m.reply("⚠️ Tidak bisa meminta sumbangan ke diri anda sendiri!.");
    }
  }
  if (/(✖️|n(o)?)/g.test(m.text.toLowerCase())) {
    m.reply(
      `😹 ${m.name.split("\n")[0]} Gada yang Nyumbang kamu , Kamu Berdosa...`
    );
    pesan.sendMessage(m.chat, { delete: key });
    clearTimeout(timeout);
    delete confirmation[sender];
  }
};

handler.help = ["sumbangan"].map((v) => v + " [jumlah]");
handler.tags = ["rpg"];
handler.command = /^(sumbangan)$/i;

export default handler;
