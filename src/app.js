require('./models/init');
import express from'express';
import path from'path';
import cookieParser from'cookie-parser';
import logger from'morgan';
import bodyParser from'body-parser';
import expressLayouts from'express-ejs-layouts';
import useragent from'express-useragent';
import createError from'http-errors';
import connectMongodb from'connect-mongo';
import session from'express-session';

import config from './config';
import * as auth from './middlewares/auth';
import page from './route.page';
import api from './route.api';

const MongoStore = new connectMongodb(session);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieName));
app.use(express.static(path.join(__dirname, 'public')));

app.use(auth.authUser);

app.use('/', page);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.format({
    json() {
      res.send({ error: err.toString() });
    }, 

    html() {
      res.render('error');
    },

    default() {
      const message = '${errorDetails}';
      res.send('500 Internal server error: \n${err.toString()}');
    },
  });
});

module.exports = app;