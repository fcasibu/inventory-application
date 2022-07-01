const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({ path: './config.env' });

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to mongodb'));

const db = mongoose.connection;

db.on('error', () => console.error('ERROR CONNECTING TO MONGODB'));

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const clubRouter = require('./routes/club');
const createRouter = require('./routes/create');
const authorRouter = require('./routes/author');
const successRouter = require('./routes/success');

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:']
    }
  })
);

app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use('/clubs', clubRouter);
app.use('/create', createRouter);
app.use('/authors', authorRouter);
app.use('/success', successRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === 'CastError') res.locals.message = 'Not Found';

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
