'use strict';

var http        = require('http');
var url         = require('url');
var io          = require('socket.io');
var controllers = require('./controllers');
const port      = 8080;

var server = http.createServer((request, response) => {
  var pageUrl = url.parse(request.url);

  switch (pageUrl.pathname) {
    case '/':
      controllers.homepage(request, response);
      break;

    default:
      controllers.notfound(request, response);
  }
});

server.listen(port);

var listener = io.listen(server);
var history  = [];

listener.sockets.on('connection', (socket) => {
  // Server Timestamp.
  setInterval(() => {
    var date = new Date();
    socket.emit('date', { date: date });
  }, 1000);

  // Recent chat messages.
  socket.emit('history', history);

  // Chat messages.
  socket.on('client-data', (data) => {
    console.log('Received message from client: ');
    console.log(data.message);

    console.log('Broadcasting message to clients.');
    listener.sockets.emit('chat-data', data);

    // Add to history.
    history.push(data.message);

    // @todo: Limit history to a specific number of recent messages.
    // history = history.slice(-5);
  });
});

console.log('Server running on ' + port);
