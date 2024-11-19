import json
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackQueryHandler, CallbackContext
import nest_asyncio
from urllib.parse import urlencode

nest_asyncio.apply()

BOT_TOKEN = "7901264656:AAH7NSnn_K1S9HDwmlZvK3ohEGvWtMqkJyg"

games = [
    {"name": "⍩⃝    Pacman", "url": "https://tele-game-haizuka.vercel.app/pacman-game/"},
    {"name": "🛸 Vây bắt chiến thuật", "url": "https://tele-game-haizuka.vercel.app/strategic-enclosure-game/"},
    {"name": "🥊 Kéo búa bao", "url": "https://tele-game-haizuka.vercel.app/time-killing-games/"},
    {"name": "🎲 Game 4", "url": "https://game4.example.com"},
]

def generate_url(base_url, chat_id):
    query_params = {"chat_id": chat_id, "game_link": base_url}
    return f"{base_url}?{urlencode(query_params)}"

async def game(update: Update, context: CallbackContext):
    chat_id = update.message.chat_id

    # Tạo bàn phím với các nút game
    game_keyboard = [
        [
            InlineKeyboardButton(games[0]["name"], url=generate_url(games[0]["url"], chat_id)),
            InlineKeyboardButton(games[1]["name"], url=generate_url(games[1]["url"], chat_id)),
        ],
        [
            InlineKeyboardButton(games[2]["name"], url=generate_url(games[2]["url"], chat_id)),
            InlineKeyboardButton(games[3]["name"], url=generate_url(games[3]["url"], chat_id)),
        ],
        [
            InlineKeyboardButton("📋 Xem thông tin của tôi", callback_data="view_info")
        ],
    ]

    reply_markup = InlineKeyboardMarkup(game_keyboard)

    # Gửi nút game
    await update.message.reply_text(
        "✨ **Chào mừng bạn đến với HaiZuka BOT game**\n\n"
        "🎯 **Hãy trải nghiệm các trò chơi :**",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )

# Hàm xử lý khi người dùng nhấn "Xem thông tin của tôi"
async def view_info(update: Update, context: CallbackContext):
    query = update.callback_query
    await query.answer()  # Trả lời callback để tránh lỗi
    # Gửi thông tin cố định
    await query.message.reply_text(
        "📋 **Thông tin của tôi:**\n\n"+
        "👤 Họ tên: Phan Đức Hải\n"+
        "📱 Zalo: 0961463407\n"+
        "🎯 Dạy lập trình và tạo tools",
        parse_mode="Markdown"
    )

async def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", game))
    app.add_handler(CallbackQueryHandler(view_info, pattern="^view_info$"))  # Xử lý khi người dùng nhấn nút
    print("Bot is running...")
    await app.run_polling()

if __name__ == "__main__":
    asyncio.run(main())
