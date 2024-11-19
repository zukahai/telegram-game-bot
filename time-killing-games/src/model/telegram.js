import { TELEGRAM_BOT_TOKEN } from './config.js';

// Hàm lấy chat_id của người dùng mới nhất nhắn tin với bot
export async function getLatestChatId() {
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to get updates from Telegram');
        }

        const data = await response.json();
        if (data.ok && data.result.length > 0) {
            // Lấy tin nhắn mới nhất
            const latestMessage = data.result[data.result.length - 1];
            const chatId = latestMessage.message.chat.id;
            console.log('Latest chat ID:', chatId);
            return chatId;
        } else {
            console.log('No messages found');
            return null;
        }
    } catch (error) {
        console.error('Error getting updates from Telegram:', error);
        return null;
    }
}

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

// Gửi điểm số
export function sendScore(score) {
    const text = `cảm ơn bạn đã chơi trò chơi!\n${score}\nChơi lại ở....`;
    sendMessage(text);
}

// Gửi tin nhắn chào mừng
export function sendWelcome() {
    sendMessage('👋 Chào mừng bạn đến với trò chơi Snake!\n🎮 Chúc bạn chơi game vui vẻ!');
}
