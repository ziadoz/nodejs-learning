# Node JS Test Application
A simple Node JS test application.

## Usage
```
docker-compose up -d
docker exec -it <container> npm --prefix /usr/src/app install
docker-compose restart
```

## Useful Commands
```
docker-compose up -d
docker-compose down
docker logs <container>
docker exec -it <container> npm --prefix /usr/src/app install
docker exec -it <container> npm --prefix /usr/src/app -g install nodemon
```

## Links
- http://danielnill.com/nodejs-tutorial-with-socketio
- https://nodejs.org/en/
- https://nodemon.io/
- https://github.com/socketio/socket.io
- https://github.com/websockets/ws
- http://koajs.com/
- http://expressjs.com/
