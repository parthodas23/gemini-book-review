const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/book.js');
const reviewRoutes = require('./routes/reviews');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://promptpal-d1bb4.web.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

module.exports = app;
