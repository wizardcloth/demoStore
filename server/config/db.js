import mongoose from "mongoose";
export async function database() {
    try {
        const connect = await mongoose.connect(process.env.url);
        console.log("database connected " + connect.connection.host);
    } catch (error) {
        console.log(`error occured ${error.message}`);
        process.exit(1);
    }
}