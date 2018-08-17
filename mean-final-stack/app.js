var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// Route modules
// (2) Include your Survey Questions router
var surveyQuestionsRouter = require('./routes/surveyQuestionLists');
// (2) Include your Survey Answers router
var surveyAnswersRouter = require('./routes/surveyAnswers');

var app = express();

// Use mongoose to connect to mongo
// (2) Include Mongoose
var mongoose = require('mongoose');
// (2) Don't forget your config file
var config =  require('./config/connect');
// (2) Connect to Mongoose
mongoose.connect(config.db, { useNewUrlParser: true })
.then(() => console.log("MongoDb connection successful."))
.catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// register 
// (3) Register your Survey Question List router
app.use('/surveyQuestionLists', surveyQuestionsRouter);
// (3) Register your Survey Answer router
app.use('/surveyAnswers', surveyAnswersRouter);

app.use('/', (req, res, next) => res.send('Go to /surveyQuestionLists or /surveyAnswers'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
