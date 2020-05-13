const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080);
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('hi', (data) => {
    console.log("socket receive from data",data);
  });
});