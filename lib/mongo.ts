import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
  mongoDb?: Promise<Db>;
};

function getUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set.");
  return uri;
}

export function getDb(): Promise<Db> {
  if (!globalForMongo.mongoDb) {
    globalForMongo.mongoClient = new MongoClient(getUri(), {
      serverSelectionTimeoutMS: 5000,
    });
    globalForMongo.mongoDb = globalForMongo.mongoClient.connect().then((client) => {
      globalForMongo.mongoClient = client;
      return client.db();
    });
  }
  return globalForMongo.mongoDb;
}
