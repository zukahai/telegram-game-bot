import json
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackContext
import nest_asyncio
from urllib.parse import urlencode

nest_asyncio.apply()

# Đọc token từ file config.json
with open("config.json", "r") as config_file:
    config = json.load(config_file)
    BOT_TOKEN = config["BOT_TOKEN"]

games = [
    {"name": "🎮 Kéo búa bao", "url": "https://tele-game-haizuka.vercel.app/time-killing-games/index.html"},
    {"name": "🕹️ Game 2", "url": "https://game2.example.com"},
    {"name": "🏆 Game 3", "url": "https://game3.example.com"},
    {"name": "🎲 Game 4", "url": "https://game4.example.com"},
]

def generate_url(base_url, chat_id):
    query_params = {"chat_id": chat_id, "game_link": base_url}
    return f"{base_url}?{urlencode(query_params)}"

async def start(update: Update, context: CallbackContext):
    chat_id = update.message.chat_id
    keyboard = [
        [
            InlineKeyboardButton(games[0]["name"], url=generate_url(games[0]["url"], chat_id)),
            InlineKeyboardButton(games[1]["name"], url=generate_url(games[1]["url"], chat_id)),
        ],
        [
            InlineKeyboardButton(games[2]["name"], url=generate_url(games[2]["url"], chat_id)),
            InlineKeyboardButton(games[3]["name"], url=generate_url(games[3]["url"], chat_id)),
        ],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "✨ **Chào mừng bạn đến với Game Hub!**\n\n"
        "🎯 **Hãy chọn một trò chơi yêu thích để bắt đầu:**",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )

async def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    print("Bot is running...")
    await app.run_polling()

if __name__ == "__main__":
    asyncio.run(main())
