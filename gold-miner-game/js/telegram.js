// Telegram integration for Pacman game
const TELEGRAM_BOT_TOKEN = '7901264656:AAH7NSnn_K1S9HDwmlZvK3ohEGvWtMqkJyg';

// Hàm gửi tin nhắn qua Telegram
export async function sendMessage(message) {
    try {
        // Lấy chat ID từ localStorage
        const chatId = localStorage.getItem("telegram_chat_id");
        if (!chatId) {
            console.error('No Telegram chat ID found. Please get your chat ID first.');
            return;
        }

        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to send message to Telegram: ${errorData.description}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
    }
}

// Gửi điểm số Pacman
export function sendScore(score, highScore) {
    const text = `🎮 Gold Miner\n` +
                `🎯 Điểm số của bạn: ${score}\n` +
                `Cảm ơn bạn đã trải nghiệm game!\n`;
    sendMessage(text);
    return Promise.resolve();
}
