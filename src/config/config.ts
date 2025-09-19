import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const ZERODHA_API_KEY = process.env.ZERODHA_API_KEY || "YOUR_API_KEY";
export const ZERODHA_ACCESS_TOKEN = process.env.ZERODHA_ACCESS_TOKEN ;