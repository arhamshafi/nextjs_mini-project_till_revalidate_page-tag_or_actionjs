import mongoose from "mongoose";

const MONGO_URL = process.env.MONGOURL || "mongodb://localhost:27017/nextlogicstillactionjs"

if (!MONGO_URL) throw new Error("please define mongo url in .env variable")

const cached = global.mongoose || { conn: null, promise: null }
global.mongoose = cached

export default async function ConnectDB() {
    if (cached.conn) return cached.conn
    if (!cached.promise) {
        const opts = { bufferCommands: false }
        cached.promise = mongoose.connect(MONGO_URL, opts)
    }
    cached.conn = await cached.promise
    return cached.conn
}
