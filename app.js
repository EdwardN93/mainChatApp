const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const pug = require('pug');

const chatRouterApi = require('./routes/chatRouteApi');
const chatRouter = require('./routes/chatRouteText');
const bookRoute = require('./routes/bookRoute');
const bookPost = require('./routes/bookPostRoute');
// const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');

//1) MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use(express.json()); //Middleware - a function that modifies incoming request
// // app.use(express.static(`${__dirname}/public`)); // Serve static files from folder

app.use('/chat', chatRouter);
app.use('/api/chat', chatRouterApi);
app.use('/book', bookRoute);
app.use('/book-post', bookPost);
// app.use('/api/v1/users', userRouter);

module.exports = app;
