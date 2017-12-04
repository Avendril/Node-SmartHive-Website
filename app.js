var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var gyro = require('./routes/gyro');
var humidity = require('./routes/humidity');
var temp = require('./routes/temp');
var weight = require('./routes/weight');
var home = require('./routes/home');

var net = require('net');
var mqtt = require('./MQTTClient.js');
var io  = require('socket.io').listen(5000);//10.37.28.64<--tssg SmartHive --> 192.168.1.102
var client = new mqtt.MQTTClient(1883, '87.44.19.170', 'Jimmy')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/gyro', gyro);
app.use('/humidity', humidity);
app.use('/temp', temp);
app.use('/weight', weight);
app.use('/home', home);

io.sockets.on('connection', function (socket) {
  socket.on('subscribe', function (data) {
    console.log('Connected!');
    client.subscribe(data.topic);
  });
});

io.sockets.on('forceDisconnect', function(){
  console.log('Disconnected!')
  socket.disconnect();
});

client.addListener('mqttData', function(topic, payload){
  //console.log(topic+'='+payload);
  io.sockets.emit('mqtt',{'topic':String(topic),'payload':String(payload)});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
