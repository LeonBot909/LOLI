import { TelegraPh } from "../../lib/uploader.js";
import fetch from "node-fetch";
import axios from 'axios';

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('Harap masukkan teks yang ingin Anda gambar.');

  try {
    await m.reply('*W r i t i n g...*');

    // URL API untuk menggambar
    const baseUrl = 'https://skizo.tech/api/bing-image';

    // Menambahkan cookie ke query string
    const url = `${baseUrl}?cookie=${encodeURIComponent(`_U=1pOH2KUDDKa93E4KLHu-QlM6vIg0FAC1QsM4RoQ-r6bLmmjKLBlKqXiZeHNJnxZTL8fK8mfKrjAbz4gWggu2YWL9Ze4IIjQW-nsUbRGTsevpPCaQiUbCdF-YLJiGXfFopOJ3fNQsuT4WBdWIeciQp6lBJx4HNB0gNHD_eyu-3DIqBKNJdVkzMZn2w-eJifCrwfDbhW_lGaaNtQnm4215C9wceC6JuzP6D8IyBb2NKMiw`)}`;

    // Payload untuk dikirim ke API
    const payload = {
      prompt: text, // Menggunakan 'prompt' sesuai dengan pesan error
      apikey: 'michelle', // Gunakan apikey yang sesuai
      characterId: "Lu2oaGyf8oI1c846jK0olzQoD8Sqau4E-SKvya87vr0"
    };

    // Melakukan permintaan POST ke API menggunakan axios
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
   // console.log("Response from API:", data);
/*
    if (!data.success) {
      throw new Error(data.message || 'Tidak dapat membuat gambar.');
    }
*/

    const filteredResult = data.result.filter(url => !url.endsWith('.svg') && !url.endsWith('.js'));

    //console.log(filteredResult);




    
    // Pastikan URL gambar valid
    //const imageUrls = data.result.filter(url => url.match(/\.(jpeg|jpg|png|gif)$/i));
    //console.log("Filtered Image URLs:", imageUrls);

    if (filteredResult.length === 0) {
      throw new Error('URL gambar tidak ditemukan.');
    }

    // Mengirim URL gambar hasil kepada pengguna
    for (const url of filteredResult) {
      await conn.sendMessage(
        m.chat,
        { image: {url} },
        { quoted: m }
      );
    }

  } catch (error) {
    console.error("Terjadi masalah dalam operasi pengambilan data:", error);

    if (error.response && error.response.data) {
      // Menangani respons kesalahan dari API dan menampilkan URL dalam pesan bot
      await conn.sendMessage(
        m.chat,
        { text: 'Maaf, terjadi kesalahan dalam membuat gambar: ' + error.response.data.message + '\nURL yang dihasilkan: ' + (error.response.data.result || []).join('\n') },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        { text: 'Maaf, terjadi kesalahan dalam membuat gambar: ' + error.message },
        { quoted: m }
      );
    }
  }
};

handler.help = ["bingimage"];
handler.tags = ["ai"];
handler.command = /^(bingimage|bing)$/i;
handler.premium = true;
handler.limit = true;

export default handler;
