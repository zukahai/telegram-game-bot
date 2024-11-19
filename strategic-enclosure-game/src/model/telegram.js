// Telegram integration for Strategic Enclosure Game
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

// Gửi thông báo khi hoàn thành level
export function sendLevelComplete(level) {
    const text = `🎮 Strategic Enclosure Game\n` +
                `🎯 Chúc mừng! Bạn đã hoàn thành màn ${level}!\n` +
                `🚀 Hãy tiếp tục chinh phục màn chơi tiếp theo nhé!`;
    sendMessage(text);
}

// Gửi thông báo khi thua
export function sendGameOver(level) {
    let congrat = "Chúc mừng bạn đã hoàn thành màn chơi level " + level;
    if (level == 1)
        congrat = "";
    const text = `🎮 Strategic Enclosure Game\n` +
                congrat +
                `💫 UFO đã trốn thoát ở màn ${level}!\n` +
                `💪 Đừng nản chí, hãy thử lại nhé!`;
    sendMessage(text);
}

// Gửi tin nhắn chào mừng
export function sendWelcome() {
    const text = `🎮 Chào mừng bạn đến với Strategic Enclosure Game!\n` +
                `🎯 Nhiệm vụ của bạn là ngăn chặn UFO trốn thoát.\n` +
                `💪 Hãy cố gắng vượt qua các thử thách nhé!`;
    sendMessage(text);
}
