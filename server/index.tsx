import mongoose, { Connection } from "mongoose";

const MONGODB_URI: string = process.env.CONNECTIONSTRING as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Direct connection without caching
async function dbConnect(): Promise<Connection> {
  try {
    const mongoose_instance = await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    return mongoose_instance.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export default dbConnect;
