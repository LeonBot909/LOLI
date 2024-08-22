import xyz from "@xyzteams/scapers";
let handler = async (m, { q, conn, args, usedPrefix, setReply, command }) => {
  const a = await xyz.download.youtube.search(q).then(async (res) => {
    if (!res) throw "No results found";
    let data = await res[0];
    if (data.duration.seconds > 600) throw "Max duration is 10 minutes";
    await conn.sendMessage(
      m.chat,
      {
        text: `Title: ${data.title}\nDuration: ${
          data.duration.timestamp
        }\nDate Uploaded: ${
          data.publish ? data.publish : "Not known"
        }\nViews: ${data.views}\nThumbnail: ${
          data.thumbnail
        }\n\n\nDownloading...,`,
        contextInfo: {
          externalAdReply: {
            title: "Play Audio",
            body: "wm",
            thumbnailUrl: data.thumbnail,
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
    return data.url;
  });
  await xyz.download.youtube.ytmp3(a).then(async (res) => {
    if (!res.url) throw "No results found";
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: res.url },
        mimetype: "audio/mp4",
      },
      { quoted: m }
    );
  });
};
handler.help = ["downloader"];
handler.tags = ["internet"];
handler.command = ["play3"];

export default handler;
