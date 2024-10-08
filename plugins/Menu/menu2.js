const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
let {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("baileys");

let handler = async (m, { conn,q, isOwner,setReply }) => {

 // Path ke folder plugins
 const pluginsFolderPath = "./plugins";
 // Daftar folder yang ingin dikecualikan dari perhitungan
 let forOwner = ["Bot-function", "Game-answer", "Game-hint", "Case"];
 let forUser = ["Bot-function", "Game-answer", "Game-hint", "Owner", "Case"];
 const excludedFolders = isOwner ? forOwner : forUser; // Ganti dengan nama folder yang ingin dikecualikan



 

 

  const timeWib = moment().tz("Asia/Jakarta").format("HH:mm:ss");
  moment.tz.setDefault("Asia/Jakarta").locale("id");

  const more = String.fromCharCode(8206);
  const readmore = more.repeat(4001);

  let dt = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
  const ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);

  let dot = new Date(new Date() + 3600000);
  const dateIslamic = Intl.DateTimeFormat("id" + "-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dot);

  const data = global.db.data.others["newinfo"];
  const info = data ? data.info : "";
  const block = await conn.fetchBlocklist();
  const timeInfo = data ? clockString(new Date() - data.lastinfo) : "tidak ada";

  // Fungsi untuk menghitung jumlah file.js dalam sebuah folder
  function countJSFiles(folderPath) {
    try {
      const files = fs.readdirSync(folderPath); // Baca isi folder secara sinkron
      let jsFileCount = 0;

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath); // Dapatkan informasi status file

        if (stat.isDirectory()) {
          if (!excludedFolders.includes(file)) {
            jsFileCount += countJSFiles(filePath); // Rekursif untuk folder dalam folder
          }
        } else {
          if (path.extname(file) === ".js") {
            jsFileCount++; // Tambahkan 1 untuk setiap file.js
          }
        }
      });

      return jsFileCount;
    } catch (error) {
      console.error("Error:", error);
      return 0; // Jika terjadi error, kembalikan nilai 0
    }
  }

  // Hitung jumlah file.js dalam semua folder di dalam folder plugins
  const totalJSFiles = countJSFiles(pluginsFolderPath);
  const totalCase = () => {
    try {
      const mytext = fs.readFileSync("./plugins/Case/case.js", "utf8");
      const numCases = (mytext.match(/(?<!\/\/)(case\s+['"][^'"]+['"])/g) || [])
        .length;
      return numCases;
    } catch (err) {
      console.error("Error:", err);
      return 0;
    }
  };





// Fungsi untuk menampilkan semua nama file tanpa ekstensi dalam sebuah folder
function displayFilesByFolder(folderPath, excludedFolders = [], premium = [], limit = [], error = [], bloked = [], isLast = false) {
    let result = ''; // Inisialisasi string kosong

    const files = fs.readdirSync(folderPath);
    files.forEach((file, index) => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        const isDirectory = stat.isDirectory();
        const folderName = isDirectory ? path.basename(filePath) : '';
        const fileNameWithoutExtension = isDirectory ? '' : path.parse(file).name;
        const isLastFile = index === files.length - 1 && !isDirectory && isLast;

        if (isDirectory && !excludedFolders.includes(folderName)) {
            result += `▧──···「 *${transformText2(folderName)}* 」\n`; // Tambahkan nama folder ke string result
            const isSubLast = index === files.length - 1 && isLast;
            result += displayFilesByFolder(filePath, excludedFolders, premium, limit, error, bloked, isSubLast); // Rekursif untuk folder dalam folder
        } else if (!isDirectory) {
            let marker = '';
            if (premium.includes(fileNameWithoutExtension)) {
                marker += '  🅟';
            }
            if (limit.includes(fileNameWithoutExtension)) {
                marker += '  🅛';
            }
            if (error.includes(fileNameWithoutExtension)) {
                marker += '  🅔';
            }
            if (bloked.includes(fileNameWithoutExtension)) {
                marker += '  🅑'; // Tambahkan tanda 🅑 jika file ada dalam blokedFiles
            }
            const transformedFileName = transformText(fileNameWithoutExtension); // Transformasikan nama file
            result += `• ${transformedFileName}${marker}\n`; // Tambahkan nama file ke string result

            if (isLastFile) {
                result += '\n'; // Tambahkan penanda akhir folder
            }
        }
    });

    if (!isLast && !result.endsWith('☉\n')) {
        result += '\n\n'; // Tambahkan penanda akhir folder jika bukan folder terakhir
    }

    return result; // Kembalikan string result setelah semua proses selesai
}

// Path ke folder plugins
//const pluginsFolderPath = './plugins';

// Daftar folder yang ingin dikecualikan dari tampilan console
//const excludedFolders = ['Bot-function', 'Game-answer', 'Game-hint']; // Ganti dengan daftar folder yang ingin dikecualikan

// Daftar file premium, limit, error, dan bloked
const premiumFiles = db.data.data.filter(item => item.name === 'premium')[0].id;
const limitFiles = db.data.data.filter(item => item.name === 'limit')[0].id;
const errorFiles = db.data.listerror.map(item => item.cmd);
const blokedFiles = db.data.blockcmd.map(item => item.cmd);

// Memanggil fungsi untuk menampilkan nama file tanpa ekstensi berdasarkan folder
const outputString = displayFilesByFolder(pluginsFolderPath, excludedFolders, premiumFiles, limitFiles, errorFiles, blokedFiles, true);

// Tampilkan string hasil menggunakan m.reply
//m.reply(outputString);
  let links = [
    "https://telegra.ph/file/c36c696f34533a7ddbced.jpg",
    //"https://telegra.ph/file/951967f8f193c97dbdc5e.jpg",
    //"https://telegra.ph/file/14a799685616320beea2f.jpg",
    //"https://telegra.ph/file/2bda43bf50a2d62f3c55b.jpg",
    ];
    
    const contextInfo = {
    forwardingScore: 1,
    isForwarded: true,
    containsAutoReply: true,
    mentionedJid: [m.sender],
    forwardedNewsletterMessageInfo: {
    newsletterJid,
    serverMessageId: 100,
    newsletterName,
    },
    businessMessageForwardInfo: {
    businessOwnerJid: m.botNumber,
    },
    externalAdReply: {
    title: `${transformText('Bot WhatsApp Multi Device')}\n${transformText(baileysVersion)}`,
    body:`Runtime ${transformText(runTime)} `,
    mediaType: 1,
    renderLargerThumbnail: true,
    thumbnailUrl: links.getRandom(),
    //jpegThumbnail: fs.readFileSync('./media/thumb2.jpg'),
    thumbnail: fs.readFileSync('./media/thumb.jpg'),
    sourceUrl: 'https://whatsapp.com/channel/0029Vaieq1zLNSa1F2mb960c', //global.myUrl,
    mediaUrl: global.myUrl,
    },
    };








  const menu = `
  📊 *Stats :*
  ▸ Running on: ${runWith}
  ▸ Hits Today: ${
    thisHit == undefined
      ? "0"
      : thisHit.toLocaleString() == undefined
      ? "0"
      : thisHit.toLocaleString()
  }
  ▸ Features: ${totalJSFiles + totalCase()}
  ▸ Errors: ${db.data.listerror.length}
  ▸ Users: ${Object.keys(db.data.users).length}
  ▸ Banned: ${db.data.banned.length}
  ▸ Blocked: ${block.length}
  ▸ Premium: ${
    Object.values(db.data.users).filter((u) => u.premiumTime !== 0).length
  }
  ▸ Blocked Commands: ${db.data.blockcmd.length}
  
  🕒 *Date & Time :*
  ▸ ${week}, ${calender}
  ▸ ${timeWib} WIB
  ▸ ${dateIslamic}
  
  ⚠ *Warning :*
  ▸ 🅟 : Premium 
  ▸ 🅛 : Limit
  ▸ 🅔 : Error
  ▸ 🅑 : Blocked
  
  🆕 *Latest Update :*
  ▸  ${info}
  ▸  di update ${timeInfo} yang lalu
  
  `;

 

 
  const lala =`
  ▧──···「 *Thanks To* 」
  • Baileys
  • Miftahganzz
  • Dittaz
  • loli
  • Zeeone Ofc
  • Yudha Perdana
  • Yogi PW
  • Decode Denpa
  • Fernazer
  • X - Dev Team
  • Dika Ardnt
  
  
  ` + "𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘉𝘺 𝘕𝘰𝘥𝘦𝘫𝘴";
  
 

 
 

  //throw listMessage.sections[0].rows
  let msg = generateWAMessageFromContent(
    m.chat,
    {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            contextInfo: {
              mentionedJid: [m.sender],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: newsletterJid,
                newsletterName: newsletterName,
                serverMessageId: -1,
              },
              businessMessageForwardInfo: {
                businessOwnerJid: conn.decodeJid(conn.user.id),
              },
              externalAdReply: {
                title: "DCODEKEMII",
                thumbnailUrl:
                  "https://telegra.ph/file/c36c696f34533a7ddbced.jpg",
                sourceUrl: "",
                mediaType: 2,
                renderLargerThumbnail: false,
              },
            },
            body: proto.Message.InteractiveMessage.Body.create({
              text: transformText(menu) + readmore + outputString+transformText(lala),
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "_Powered By NodeJS_",
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: `*Hello, @${m.sender.replace(/@.+/g, "")}!*`,
              subtitle: "Kemii",
              hasMediaAttachment: true,
              ...(await prepareWAMessageMedia(
                {
                  image: {
                    url: "https://telegra.ph/file/c36c696f34533a7ddbced.jpg",
                  },
                },
                { upload: conn.waUploadToServer }
              )),
            }),
            nativeFlowMessage:
              proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                    {
                        name: "quick_reply",
                        buttonParamsJson:
                          '{"display_text":"Owner","id":"!owner"}',
                      },
                  {
                    name: "quick_reply",
                    buttonParamsJson:
                      '{"display_text":"Dashboard","id":"!dashboard"}',
                  },{},
                ],
              }),
          }),
        },
      },
    },
    {}
  );

  await conn.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id,
  });





 



};
handler.help = ["all"];
handler.tags = ["internet"];
handler.command = ["menu2"];
handler.limit = true;
export default handler;
