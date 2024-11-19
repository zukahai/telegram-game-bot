import json
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackQueryHandler, CallbackContext
import nest_asyncio
from urllib.parse import urlencode

nest_asyncio.apply()

BOT_TOKEN = "7901264656:AAH7NSnn_K1S9HDwmlZvK3ohEGvWtMqkJyg"

games = [
    {
        "name": "⍩⃝    Pacman", 
        "url": "https://tele-game-haizuka.vercel.app/pacman-game/",
        "image": "https://imgur.com/a/FjWeqg1"
    },
    {
        "name": "💰 Đào vàng", 
        "url": "https://tele-game-haizuka.vercel.app/gold-miner-game/",
        "image": "https://imgur.com/gBnmvh3"
    },
    {
        "name": "🛸 Vây bắt chiến thuật", 
        "url": "https://tele-game-haizuka.vercel.app/strategic-enclosure-game/",
        "image": "https://imgur.com/VjuLk0B"
    },
    {
        "name": "🗼 Tháp Hà Nội", 
        "url": "https://tele-game-haizuka.vercel.app/hanoi-towers-game/",
        "image": "https://imgur.com/ykCSktS"
    },
    {
        "name": "🥊 Kéo búa bao", 
        "url": "https://tele-game-haizuka.vercel.app/time-killing-games/",
        "image": "https://i.imgur.com"
    }
]

def generate_url(base_url, chat_id):
    query_params = {"chat_id": chat_id, "game_link": base_url}
    return f"{base_url}?{urlencode(query_params)}"

async def game(update: Update, context: CallbackContext):
    chat_id = update.message.chat_id

    game_keyboard = [
        [
            InlineKeyboardButton(games[0]["name"], callback_data=f"game_0"),
            InlineKeyboardButton(games[1]["name"], callback_data=f"game_1"),
        ],
        [
            InlineKeyboardButton(games[2]["name"], callback_data=f"game_2"), 
            InlineKeyboardButton(games[3]["name"], callback_data=f"game_3"),
        ],
        [
            InlineKeyboardButton(games[4]["name"], callback_data=f"game_4"), 
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

# Hàm xử lý khi người dùng chọn game
async def button_click(update: Update, context: CallbackContext):
    print("Button clicked")
    query = update.callback_query
    await query.answer()
    
    if query.data.startswith("game_"):
        game_index = int(query.data.split("_")[1])
        chat_id = query.message.chat_id
        game_name = games[game_index]["name"]
        game_url = generate_url(games[game_index]["url"], chat_id)
        
        print(f"User {chat_id} clicked on game: {game_name}")
        
        # Mở game trong trình duyệt, hiện thị cả image
        await query.message.reply_photo(
            photo=games[game_index]["image"],
            caption=f"🎮 **{game_name}**\n\n"
                    f"🔗 [Bắt đầu chơi]({game_url})",
            parse_mode="Markdown"
        )
async def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", game))
    app.add_handler(CallbackQueryHandler(view_info, pattern="^view_info$"))
    app.add_handler(CallbackQueryHandler(button_click, pattern="^game_"))  # Thêm handler mới
    print("Bot is running...")
    await app.run_polling()

if __name__ == "__main__":
    asyncio.run(main())
