const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test'; // .env 파일에서 MONGO_URI 가져오기

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

module.exports = mongoose;