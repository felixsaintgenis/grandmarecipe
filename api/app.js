import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import config from './config/config'

//import routes

import users from './routes/users'
import profile from './routes/profile'

const app = express();


// Connect to the mlab database

mongoose.connect(config.databaseUrl, {
  })
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log(err));

// use routes

app.use('/api/users', users)
app.use('/api/profile', profile)

  // Start the server
//
//   app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });
  app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
