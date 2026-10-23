const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rasi-foundation';

async function testConnection() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
}

testConnection();
