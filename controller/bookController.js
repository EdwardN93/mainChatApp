const Book = require('../model/bookModel');

exports.getAllBooks = async (req, res) => {
  try {
    const bookings = await Book.find();
    res.status(201).json({
      status: 'success',
      results: bookings.length,
      data: {
        book: bookings,
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

exports.renderBooks = async (req, res) => {
  try {
    const book = await Book.find();

    res.render('booking', {
      book,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.postBook = async (req, res) => {
  try {
    // const newBooking = await Book.create(req.body);
    // res.status(201).json({
    //   status: 'success',
    //   data: {
    //     book: newBooking,
    //   },
    res.render('book-post');
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.postBooks = async (req, res) => {
  try {
    const newBooking = await Book.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        book: newBooking,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
