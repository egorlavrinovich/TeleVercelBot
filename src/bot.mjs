import TeleBot from "telebot";
import mongo from "../db.mjs";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

// bot.on("text", (msg) => msg.reply.text(msg.text));

bot.on("/db", (msg) => msg.reply.text(mongo.db().databaseName));

export default bot;
