require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URL || process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error('Mongo connection failed: MONGO_URL (or MONGODB_URI) is not set in the environment.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connection success');
    } catch (error) {
        console.error('Mongo connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;