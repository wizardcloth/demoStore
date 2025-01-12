import express from "express";
import dotenv from "dotenv";
import { database } from "./config/db.js";
import router from "./router/products.route.js";
import { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
// Uncomment the following if you need to handle URL-encoded form data
// app.use(express.urlencoded({ extended: true }));

app.use("/api/products", router);

// Database connection before starting the server
const connectToDatabase = async () => {
    try {
        await database();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1); // Exit if database connection fails
    }
};

// Your Express handler to work with Vercel serverless functions
app.get("/", (req, res) => res.send("Serverless Express API"));

// Export the handler as a Vercel function
export default async function handler(req, res) {
    await connectToDatabase();
    app(req, res); // Pass the request and response to Express
}

// If you have the `PORT` variable set, you can console log it for debugging
// console.log(process.env.PORT);
