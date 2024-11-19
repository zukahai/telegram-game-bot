import json
import asyncio
import os
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackContext
import nest_asyncio
from urllib.parse import urlencode

nest_asyncio.apply()

# Get token from environment variable or config file
BOT_TOKEN = os.environ.get("BOT_TOKEN")
if not BOT_TOKEN:
    # Fallback to config.json if environment variable is not set
    with open("config.json", "r") as config_file:
        config = json.load(config_file)
        BOT_TOKEN = config["BOT_TOKEN"]

games = [
    {"name": "", "url": "https://tele-game-haizuka.vercel.app/pacman-game/"},
    {"name": "", "url": "https://tele-game-haizuka.vercel.app/strategic-enclosure-game/"},
    {"name": "", "url": "https://tele-game-haizuka.vercel.app/time-killing-games/"},
    {"name": "", "url": "https://game4.example.com"},
]

def generate_url(base_url, chat_id):
    query_params = {"chat_id": chat_id, "game_link": base_url}
    return f"{base_url}?{urlencode(query_params)}"

async def game(update: Update, context: CallbackContext):
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
        "**Chào mừng bạn đến với HaiZuka BOT game**\n\n"
        "**Hãy chọn một trò chơi yêu thích để bắt đầu:**",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )

async def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", game))
    print("Bot is running...")
    await app.run_polling()

if __name__ == "__main__":
    asyncio.run(main())
