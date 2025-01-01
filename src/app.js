import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

// Middlewares
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import validateToken from './middlewares/validateToken.js';

// Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/app_user.js';

const app = express();

// Helmet
app.use(helmet());

// CORS
const whitelist = process.env.CORS_WHITELISTS.split(', ');
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.log('error', `Unallowed origin ${origin} is making an attempt to access your APIs.`);
            callback(new Error('Not allowed by CORS'));
        }
    }
}
app.use(cors(corsOptions));

// JSON
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Public Routes
app.use('/api/auth', authRoutes);

// Auth Routes
app.use('/api/user', validateToken, userRoutes);

// Global Error Handler
app.use('*', globalErrorHandler);

// Uncaught Errors
process.on('uncaughtException', (err) => {
    console.error('error', `\nUncaught Exception occurred...`);
    console.error('error', err.stack);
});

const APP_PORT = process.env.APP_PORT || 3000;
app.listen(APP_PORT, () => console.log(`Application is running on localhost:${APP_PORT}.`));