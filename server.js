const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const tasks = require('./routes/task');
require('dotenv').config();
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

// server start code
const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log('connected to the db....');
    app.listen(5000, () => {
      console.log(`server is running on port ${port}..`);
    });
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

startServer();
