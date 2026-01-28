import { connect } from "mongoose";
import mongoose from "mongoose";

const mongodbUrl = process.env.MONGO_URL;
if (!mongodbUrl) {
    throw new Error("Counld not find mongo url");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
const connectDb = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = connect(mongodbUrl).then((c) => c.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        throw error;
    }
    return cached.conn;
};
export default connectDb;
