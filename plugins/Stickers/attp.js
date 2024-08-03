let handler = async (m, { q, conn, args, setReply, command }) => {
  if (!q) return setReply(mess.query);
  const { ttp, attp } = await import("../../lib/text2picture.js");
  let aan = await attp(q);
  let media = aan[0].url;
  await conn.toSticker(m.chat, media, m);
};
handler.help = ["sticker"];
handler.tags = ["tools"];
handler.command = ["attp"];

export default handler;
