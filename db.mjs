import { MongoClient } from "mongodb";

const uri = process.env.DB_TOKEN;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 3000,
  });

  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db("test"); // ❗ ЯВНОЕ ИМЯ БД
}
