const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(express.json());

const db = config.get('mongoURI')

  //setup database
  mongoose.Promise = global.Promise;
  // MongoDB Connection
  if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(db || process.env.MONGO_URL,
      { useNewUrlParser: true, useCreateIndex: true },
      (error) => {
      if (error) {
        console.error('Please make sure Mongodb is installed and running!');
        throw error;
      }else console.log('connected to mongodb database!');
    });
  }

// User Routes
app.use('/api/Restaurants', require('./routes/api/Restaurants'));
app.use('/api/Users', require('./routes/api/Users'));
app.use('/api/Auth', require('./routes/api/Auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));