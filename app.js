var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/database');
//Sesstions
var session = require('express-session');

//Models 

var Bairro = require('./model/Bairro');
var TipoImovel = require('./model/TipoImovel');
var Chaves = require('./model/Chave');
var Emprestimos = require('./model/Emprestimo');
var User = require('./model/User');
//Rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chavesRouter = require('./routes/chaves');
var tiposRouter = require('./routes/tipoimovel');
var bairrosRouter = require('./routes/bairro');
var emprestimosRouter = require('./routes/emprestimos');
var devolucoesRouter = require('./routes/devolucoes');
var etiquetasRouter = require('./routes/etiquetas');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Sesstion config
app.use(session({
  secret: "capitalimoveis",
  resave: true,
  saveUninitialized: true
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chaves',chavesRouter);
app.use('/',tiposRouter);
app.use('/',bairrosRouter);
app.use('/',emprestimosRouter);
app.use('/',devolucoesRouter);
app.use('/',etiquetasRouter);

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
/*
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});
*/

module.exports = app;
