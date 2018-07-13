import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/config';
import passport from 'passport';
import cors from 'cors';
//import routes

import users from './routes/users';
import profile from './routes/profile';
import recipes from './routes/recipes';


const app = express();

app.use(cors())

// Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the mlab database

mongoose.connect(config.databaseUrl, {
  })
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
//Passport Config
require('./config/passport')(passport);

// use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/recipes', recipes);

  // Start the server
//
//   app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });
  app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
