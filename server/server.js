import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import ideasRouter from './routes/ideas.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    /\.vercel\.app$/        // allows any *.vercel.app domain
  ]
}));
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Mount routes
app.use('/api/ideas', ideasRouter);

// Start server
const startServer = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/startupvalidator';
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error.message);
        console.log('Ensure MongoDB is running locally or a valid MONGO_URI is set.');
    }
};

startServer();
