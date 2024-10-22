import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DB_URI || '';

const connectDB = handler => async (req, res) => {
    try {
        if (mongoose.connections[0]?.readyState) {
            // console.log("Already Connected!");
            return handler(req, res);
        }
        await mongoose.connect(dbUrl, {
            useUnifiedTopology: true,
            dbName: 'LMS' // Specify the database name
        });
        console.log("Now Connected!");
        return handler(req, res);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).json({ error: 'Database connection error' });
    }
};

module.exports = connectDB;