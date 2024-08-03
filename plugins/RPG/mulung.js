let handler = async (m, { conn, usedPrefix, text }) => {
  let user = global.db.data.users[m.sender];
  let time = user.lastmulung + 1800000;
  if (new Date() - user.lastmulung < 1800000)
    throw `Anda sudah lelah untuk mulung\nTunggu selama ${msToTime(
      time - new Date()
    )} lagi`;
  let botol = `${Math.floor(Math.random() * 1000)}`.trim();
  let kaleng = `${Math.floor(Math.random() * 1000)}`.trim();
  let kardus = `${Math.floor(Math.random() * 1000)}`.trim();
  let gelas = `${Math.floor(Math.random() * 1000)}`.trim();
  let plastik = `${Math.floor(Math.random() * 1000)}`.trim();

  user.botol += botol * 1;
  user.kaleng += kaleng * 1;
  user.kardus += kardus * 1;
  user.gelas += gelas * 1;
  user.plastik += plastik * 1;
  user.lastmulung = new Date() * 1;
  m.reply(
    `Selamat kamu mendapatkan : \n+${botol} Botol\n+${kaleng} Kaleng\n+${kardus} Kardus\n+${gelas} Gelas\n+${plastik} Plastik`
  );
};
handler.help = ["mulung"];
handler.tags = ["rpg"];
handler.command = /^(mulung)/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
export default handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + " jam " + minutes + " menit " + seconds + " detik";
}
