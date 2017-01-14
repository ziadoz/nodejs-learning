'use strict';

const http = require('http');
const url  = require('url');
const fs   = require('fs');
const io   = require('socket.io');
const port = 8080;

var controllers = {
  homepage: (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("<p>Hello, World!</p>");
    response.end();
  },

  socket: (request, response) => {
      fs.readFile(__dirname + '/socket.html', (error, data) => {
          if (error) {
            controllers.notfound(request, response);
            return;
          }

          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.write(data, 'utf8');
          response.end();
      });
  },

  notfound: (request, response) => {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write("<h1>Page Not Found</h1>");
    response.write("<p>Sorry, but we've lost this page.</p>");
    response.end();
  }
};

const server = http.createServer((request, response) => {
  var pageUrl = url.parse(request.url);

  switch (pageUrl.pathname) {
    case '/':
      controllers.homepage(request, response);
      break;

    case '/socket.html':
      controllers.socket(request, response);
      break;

    default:
      controllers.notfound(request, response);
  }
});

server.listen(port);

const listener = io.listen(server);

listener.sockets.on('connection', (socket) => {
  setInterval(() => {
    var date = new Date();
    socket.emit('date', { date: date });
  }, 1000);

  socket.on('client-data', (data) => {
    console.log('Received message from client: ');
    console.log(data.message);

    console.log('Broadcasting message to clients.');
    listener.sockets.emit('chat-data', data);
  });
});

console.log('Server running on ' + port);
