import TeleBot from "telebot";
import { getDb } from "../db.mjs";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

bot.on("/db", async (msg) => {
  const db = await getDb();
  msg.reply.text(`DB: ${db.databaseName}`);
});

bot.on("text", (msg) => msg.reply.text("BOT ALIVE"));

export default bot;
