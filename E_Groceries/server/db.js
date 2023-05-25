require('dotenv').config();
// DB Connection File
const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017/groceries'

async function connectToMongo() {
  try {
    await mongoose.connect(connectionUrl);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

module.exports = connectToMongo;