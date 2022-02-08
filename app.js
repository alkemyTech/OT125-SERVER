const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var methodOverride = require('method-override');
const cors = require('cors');
require('dotenv').config();

const rolesRouter = require('./routes/role');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/categories');
const newsRouter = require('./routes/news');
const testimonialsRouter = require('./routes/testimonials');
const orgRouter = require('./routes/organization');
const membersRouter = require('./routes/members');

const ActivitiesRouter = require('./routes/activities');
const commentRouter = require('./routes/comment');
const membersRouter = require('./routes/members');


const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/roles', rolesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/categories', categoryRouter);
app.use('/news', newsRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/organizations', orgRouter);
app.use('/members', membersRouter);
app.use('/activities', ActivitiesRouter);
app.use('/comments', commentRouter);
app.use('/members',membersRouter);

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
  res.render('error');
});

module.exports = app;
