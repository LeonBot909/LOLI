import axios from "axios";

let handler = async (m, { conn, text }) => {
    const chat = global.db.data.chats[m.chat];

    if (text === "off") {
        chat.simi = false;
        m.reply("Berhasil mematikan auto simi di group ini");
    } else if (text === "on") {
        chat.simi = true;
        m.reply("Berhasil mengaktifkan auto simi di group ini");
    } else {
        if (!text) throw "Mau ngomong apa kak sama simi?";
        try {
            let simi = await getMessage(text);
            m.reply(simi);
        } catch (e) {
            throw "Maaf kak aku ga paham hehehe...";
        }
    }
};

handler.help = ["simi"];
handler.tags = ["fun"];
handler.command = /^(simi)$/i;
handler.onlyprem = true;
handler.limit = true;
export default handler;

async function getMessage(text) {
    const data = new URLSearchParams();
    data.append('text', text);
    data.append('lc', 'id');

    const config = {
        method: 'post',
        url: 'https://simsimi.vn/web/simtalk',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: data
    };

    try {
        let { data: result } = await axios(config);
        return result.success; // Mengembalikan hasil dari API
    } catch (e) {
        throw "Terjadi kesalahan saat mendapatkan jawaban dari Simi.";
    }
}
