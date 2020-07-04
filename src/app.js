require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes');

const log = require('./config/log');

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.use(cors());

app.use(express.json());

app.use(log);

app.use(routes);

app.listen(process.env.PORT || 3333);