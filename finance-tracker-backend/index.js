import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { connectDB } from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import configurePassport from './config/passport.js';
import authRoutes from './routes/auth.js';
// Configure environment variables first
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

//initialize express
const app = express();

//connect to db
connectDB();

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));

//passsport middleware
app.use(passport.initialize());
configurePassport();

//Routes
app.use('/api/v1/auth', authRoutes);

//Health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running" });
});

//Error handling middleware
app.use(errorHandler);

export default app;
