const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socket = require('socket.io');
const http = require('http');
const app = require('./app');
const server = http.Server(app);
const io = socket(server);

const activeUsers = new Set();

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

io.on('connection', (socket) => {
  console.log('a user is connected');

  socket.on('new user', function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit('new user', [...activeUsers]);
    console.log(`user ${data} connected`);
  });

  socket.on('chat message', function (data) {
    io.emit('chat message', data);
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
