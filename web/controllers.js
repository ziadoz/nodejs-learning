var fs = require('fs');

exports.homepage = (request, response) => {
  fs.readFile(__dirname + '/html/chat.html', (error, data) => {
      if (error) {
        exports.notfound(request, response);
        return;
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data, 'utf8');
      response.end();
  });
};

exports.notfound = (request, response) => {
  response.writeHead(404, {'Content-Type': 'text/html'});
  response.write("<h1>Page Not Found</h1>");
  response.write("<p>Sorry, but we've lost this page.</p>");
  response.end();
};
