import dotenv from "dotenv"

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173", 
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET
}