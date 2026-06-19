const mongoose = require('mongoose');

const connectToDB = async () => {
    // Fallback explicitly to process.env if the root injector missed it
    const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!dbUri) {
        console.error("CRITICAL: MONGODB_URI is completely missing from environment variables!");
    }
    
    await mongoose.connect(dbUri);
    console.log("Database connected successfully!");
};

module.exports = connectToDB;