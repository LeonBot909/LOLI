import fs from 'fs-extra'

let handler = (m) => m;
handler.before = async function (m, { conn, prefix }) {
const isAllMedia = (m.type === 'imageMessage' || m.type === 'viewOnceMessageV2' || m.type === 'videoMessage'|| m.type === 'viewOnceMessage'  || m.type === 'stickerMessage' || m.type === 'audioMessage' || m.type === 'contactMessage')
const Quoted = m.quoted !== null? true : false
 


//Reply dengan text
const isQuotedImage = m.type  === 'extendedTextMessage' && Quoted? m.quoted.mtype == 'imageMessage': false
const isQuotedVideo = m.type  === 'extendedTextMessage' && Quoted? m.quoted.mtype == 'videoMessage': false
const isQuotedSticker = m.type  === 'extendedTextMessage' && Quoted? m.quoted.mtype == 'stickerMessage': false
const isQuotedAudio = m.type  === 'extendedTextMessage' && Quoted? m.quoted.mtype == 'audioMessage': false
const isQuotedText = m.type  === 'extendedTextMessage' && m.content.includes('conversation')
const isQuotedViewOnce = m.type  === 'extendedTextMessage' && Quoted? (m.quoted.mtype == 'viewOnceMessage'||m.quoted.mtype == 'viewOnceMessageV2'): false
const isQuotedContact  = m.type  === 'extendedTextMessage' && Quoted? m.quoted.mtype == 'contactMessage': false

//reply dengan sticker
const isStickerText = m.type  === 'stickerMessage' && Quoted? m.quoted.mtype == 'extendedTextMessage': false
const isStickerStick = m.type  === 'stickerMessage' && Quoted? m.quoted.mtype == 'stickerMessage': false
const isStickerImage = m.type  === 'stickerMessage' && Quoted? m.quoted.mtype == 'imageMessage': false
const isStickerVideo = m.type  === 'stickerMessage' && Quoted? m.quoted.mtype == 'videoMessage': false
const isStickerAudio = m.type  === 'stickerMessage' && Quoted? m.quoted.mtype == 'audioMessage': false
const isStickerContact = m.type  === 'stickerMessage' && Quoted? m.quoted.mtype == 'contactMessage': false
const isStickerVio = m.type  === 'stickerMessage' && Quoted? (m.quoted.mtype == 'viewOnceMessage'||m.quoted.mtype == 'viewOnceMessageV2'): false

//reply dengan audio
const isAudioText = m.type  === 'audioMessage' && Quoted? m.quoted.mtype == 'extendedTextMessage': false
const isAudiorStick = m.type  === 'audioMessage' && Quoted? m.quoted.mtype == 'stickerMessage': false
const isAudioImage = m.type  === 'audioMessage' && Quoted? m.quoted.mtype == 'imageMessage': false
const isAudiorVideo = m.type  === 'audioMessage' && Quoted? m.quoted.mtype == 'videoMessage': false
const isAudioAudio = m.type  === 'audioMessage' && Quoted? m.quoted.mtype == 'audioMessage': false
const isAudioContact = m.type  === 'audioMessage' && Quoted? m.quoted.mtype == 'contactMessage': false
const isAudiorVio = m.type  === 'audioMessage' && Quoted? (m.quoted.mtype == 'viewOnceMessage'||m.quoted.mtype == 'viewOnceMessageV2'): false

//reply dengan Image
const isImageText = m.type  === 'imageMessage' && Quoted? m.quoted.mtype == 'extendedTextMessage': false
const isImageStick = m.type  === 'imageMessage' && Quoted? m.quoted.mtype == 'stickerMessage': false
const isImageImage = m.type  === 'imageMessage' && Quoted? m.quoted.mtype == 'imageMessage': false
const isImageVideo = m.type  === 'imageMessage' && Quoted? m.quoted.mtype == 'videoMessage': false
const isImageAudio = m.type  === 'imageMessage' && Quoted? m.quoted.mtype == 'audioMessage': false
const isImageContact = m.type  === 'imageMessage' && Quoted? m.quoted.mtype == 'contactMessage': false
const isImageVio = m.type  === 'imageMessage' && Quoted? (m.quoted.mtype == 'viewOnceMessage'||m.quoted.mtype == 'viewOnceMessageV2'): false


//reply dengan Video
const isVideoText = m.type  === 'videoMessage' && Quoted? m.quoted.mtype == 'extendedTextMessage': false
const isVideoStick = m.type  === 'videoMessage' && Quoted? m.quoted.mtype == 'stickerMessage': false
const isVideoImage = m.type  === 'videoMessage' && Quoted? m.quoted.mtype == 'imageMessage': false
const isVideoVideo = m.type  === 'videoMessage' && Quoted? m.quoted.mtype == 'videoMessage': false
const isVideoAudio = m.type  === 'videoMessage' && Quoted? m.quoted.mtype == 'audioMessage': false
const isVideoContact = m.type  === 'videoMessage' && Quoted? m.quoted.mtype == 'contactMessage': false
const isVideoVio = m.type  === 'videoMessage' && Quoted? (m.quoted.mtype == 'viewOnceMessage'||m.quoted.mtype == 'viewOnceMessageV2'): false


//Hasil Quotednya
const Sticker = (isQuotedSticker||isStickerStick||isAudiorStick||isImageStick||isVideoStick)
const Video = (isQuotedVideo||isStickerVideo||isAudiorVideo||isImageVideo||isVideoVideo)
const Image = (isQuotedImage||isStickerImage||isAudioImage||isImageImage||isVideoImage)
const Audio = (isQuotedAudio||isStickerAudio||isAudioAudio||isImageAudio||isVideoAudio)
const contact = (isQuotedContact||isStickerContact||isAudioContact||isImageContact||isVideoContact)
const Vio = (isQuotedViewOnce||isStickerVio||isAudiorVio||isImageVio||isVideoVio)
const Text = (isQuotedText||isStickerText||isAudioText||isImageText||isVideoText)

const anonChat = db.data.anonymous;

//ANONYMOUS CHAT
const roomChat = Object.values(anonChat).find(
(room) => [room.a, room.b].includes(m.sender) && room.state == "CHATTING"
);
const roomA = Object.values(anonChat).find((room) => room.a == m.sender);
const roomB = Object.values(anonChat).find((room) => room.b == m.sender);
const room = Object.values(anonChat).find(
(room) => room.state == "WAITING" && room.b == ""
);
const isCmd = m.body.startsWith(prefix);

if (roomChat && !isCmd && !m.isGroup && roomChat.b !== "") {
//let nono = m.quoted.fakeObj? m.quoted.fakeObj : m
let other = [roomChat.a, roomChat.b].find((user) => user !== m.sender);


if( m.quoted !== null && Sticker){
  log('stiker')
var  message = {
stickerMessage: m.quoted
}

} else if( m.quoted !== null && Image){
  log('image')
var  message = {
imageMessage: m.quoted
}

} else if( m.quoted !== null && Video){
  log('vidio')
var  message = {
videoMessage: m.quoted
}

} else if( m.quoted !== null && Audio){
  log('audio')
var  message = {
audioMessage: m.quoted
}

} else if( m.quoted !== null && contact){
  log('kontak')
var  message = {
contactMessage: m.quoted
}

} else if(m.quoted !== null &&  Vio){
  log('vio')
  var  message = {
    viewOnceMessage: m.quoted
  }
  
  } else if( m.quoted !== null && Text){
    log('text')
    var  message = {
      extendedTextMessage: {
        text: m.quoted == null ? '' : m.quoted.fakeObj.message.extendedTextMessage.text,
        title: m.quoted == null ? '' : m.quoted.fakeObj.message.extendedTextMessage.text
      },
    }
    
    }  else if( m.quoted !== null) {
log('tidak ada')
        var  message = {
          extendedTextMessage: {
            text: m.quoted == null ? '' : m.quoted.fakeObj.message.extendedTextMessage.text,
            title: m.quoted == null ? '' : m.quoted.fakeObj.message.extendedTextMessage.text
          },
  
        }
        
        }

//log(m.quoted.mtype)


let test = {
key: {
fromMe: false,
participant: m.botNumber,
remoteJid: m.botNumber
},
message 
};

let quoted = m.quoted == null? {}: {quoted:test}

let contextInfo = {
forwardingScore: 1,
isForwarded: true
}



if(!isAllMedia){
await conn.sendMessage(other, {text: m.body, contextInfo},quoted)
// conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} else if(isAllMedia&& Quoted){
let file = await conn.downloadMed(m.msg)
let media = fs.readFileSync(file)
if(m.type  === 'stickerMessage') {
  await conn.sendMessage(other,{sticker:media},quoted)
} else if(m.type  === 'audioMessage') {
  await conn.sendMessage(other, {audio:media},quoted)
} else if(m.type  === 'imageMessage'){
 await conn.sendMessage(other, {image:media},quoted)
} else if(m.type  === 'videoMessage') {
  await conn.sendMessage(other, {video:media},quoted)
} else return conn.sendMessage(other,{text:'Media gagal di kirim oleh bot'})
fs.unlinkSync(file)

} else m.copyNForward(other, true);


}

if (room && Date.now() >= room.expired) {
await conn.sendMessage(room.a, {
text: "Partner tidak di temukan\nKamu telah keluar dari room anonymous",
});
anonChat.splice(anonChat.indexOf(room, 1));
}

};
export default handler;


