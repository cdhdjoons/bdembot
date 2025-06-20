require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Start Playing 🕹", web_app: { url: "https://bdemgame.vercel.app" } }],  // 게임 링크 수정
      // [{ text: "🔘 Follow on X 🐦", url: "https://x.com/Judo_Shiba" }],
      [{ text: "🔘 Join the Pond 🐡", url: "https://t.me/KoiCoinOfficial" }],
      // [{ text: "🔘 Visit Website 🌐", url: "https://www.karateinu.xyz" }],
      // [{ text: "🔘 Read Master book 📖", url: "https://www.karateinu.xyz" }],
    ],
  };

  const message = `
🎀 Welcome to BarbieDogeElonM Game! 🧸🚀🐶  
You've just entered the sparkliest, barkiest, most chaotic multiverse ever created on-chain.

✨ Here's what's waiting for you:
🕹 Tap through glittery meme missions full of Barbie dreams and Doge screams  
🚀 Ride Elon's rockets, collect $BDEM, and upgrade your cosmic style  
💰 Earn rewards by completing daily chaos quests  
💅 Unlock outfits, props, and over-the-top accessories in the Meme Shop  
🏆 Climb the leaderboard and become Queen (or King) of the Memeverse

🔄 From fabulous to feral — it all starts with one tap.

🚀 Ready to break the chain in style?
Tap a button below to enter:
  `;

  const pngUrl = 'https://bdembot.vercel.app/bdempic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

