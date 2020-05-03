const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
// database
const connectDB = require('./config/db');
connectDB();
// Express Utils
const app = express();
app.use(express.json({ extended: true }));
// middleware
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

// Route
app.use('/api/mood', require('./routes/moodData'));

// 404
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'success' });
});

// 404
app.get('/*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log('App is running on port: ' + process.env.PORT);
});
