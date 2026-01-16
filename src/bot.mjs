import TeleBot from "telebot";
import { getDb } from "../db.mjs";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

bot.on("/start", async (msg) => {
  try {
    const db = await getDb();
    const users = db.collection("users");

    const telegramId = msg.from.id;

    await users.updateOne(
      { telegramId },
      {
        $set: {
          telegramId,
          username: msg.from.username || null,
          firstName: msg.from.first_name || null,
          lastName: msg.from.last_name || null,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    msg.reply.text("✅ Пользователь сохранён в базе");
  } catch (e) {
    console.error("DB error:", e);
    msg.reply.text("❌ Ошибка при записи в БД");
  }
});

bot.on("text", (msg) => msg.reply.text("Я жив 🤖"));

bot.on("/users", async (msg) => {
  const db = await getDb();
  const count = await db.collection("users").countDocuments();
  msg.reply.text(`👥 Пользователей в базе: ${count}`);
});

export default bot;
