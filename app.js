var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.emit('connected');
	
	socket.on('say my name', function(data){
		console.log(data);
		socket.broadcast.emit('say my name', data);
	});
});

var port = process.env.PORT || 80;
server.listen(port, function() {
  console.log("Listening on " + port);
});