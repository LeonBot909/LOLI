async function sendMessageToSimSimi(message) {
    const url = 'https://simsimi.vn/web/simtalk';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: message })  // Ganti dengan struktur data yang benar jika diperlukan
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.response;  // Ganti 'response' dengan key yang benar sesuai data yang diterima
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
handler.help = ["simi"];
          handler.tags = ["fun"];
          handler.command = /^(simi)$/i;
          handler.onlyprem = true;
          handler.limit = true;
          export default handler;
