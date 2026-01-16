import { start } from "telebot-vercel";
import bot from "../src/bot.mjs";
import dbConnect from "../db.mjs";

export default (async () => {
  await dbConnect().catch(console.dir);
  start({ bot });
})();
