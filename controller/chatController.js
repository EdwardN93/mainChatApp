const Chat = require('../model/chatModel');
const pug = require('pug');
const io = require('socket.io');

// const compiledFunction = pug.compileFile('index.pug');

// console.log(
//   compiledFunction({
//     name: 'Edward',
//   })
// );

exports.postChat = async (req, res) => {
  try {
    const newChat = await Chat.create(req.body);
    io.emit('message', req.body);

    res.status(201).json({
      status: 'success',
      data: {
        chat: newChat,
      },
    });
    //   res.send('Done');
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getAllChat = async (req, res) => {
  try {
    const chat = await Chat.find();

    res.status(200).json({
      status: 'success',
      results: chat.length,
      data: {
        chat,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getTextChat = async (req, res) => {
  try {
    const chat = await Chat.find();

    res.render('index', {
      chat,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
