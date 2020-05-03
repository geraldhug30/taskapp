const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// database
// temporary database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI_LOCAL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connected to database');
  } catch (error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  }
};
connectDB();

// Express Utils
const app = express();
app.use(express.json({ extended: true }));
// middleware

// Route
app.use('/api/mood', require('./routes/moodData'));

// 404
app.get('/*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' });
});

module.exports = app;
