const mongoose = require("mongoose");

const { MongoMemoryServer } = require("mongodb-memory-server");
let mongod: any = null;

const connectDB = async (mode?: string) => {
  let dbUrl = process.env.DB_URI;

  if (process.env.NODE_ENV === "test") {
    mongod = await MongoMemoryServer.create();
    dbUrl = mongod.getUri();
  }

  const conn = await mongoose.connect(dbUrl);
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };
