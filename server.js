var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
// create the express app
var app = express();

app.use(bodyParser.urlencoded());
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// tell the express app to listen on port 3000
var server = app.listen(8000, function() {
	console.log("listening on port 8000");
})

app.get('/', function(req, res) {
    res.render('index');
})

const io = require('socket.io').listen(server);

let background_color = "";
//2
io.on('connect', function(socket) {
	socket.emit('connection', {msg: "Connection Successful...!", background_color: background_color});

	socket.on("color", function(data){
		background_color = data;
		io.emit('change_color', background_color);
	})
})