var fs 		= require("fs"); 
var express = require("express"); 
// var config  = JSON.parse(fs.readFileSync("config.json")); 
// var host = config.host; 
// var port = config.port; 
var app = express(); 
app.listen(9000); 
var socketio = require('socket.io').listen(9901, '107.23.45.102'); 
console.log('starting the server'); 


function sendIndex(req, res){ 
	var html; 
	html = '<!DOCTYPE html><html><head><meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">'; 
	html += '<script type="text/javascript" src="js/libs/require.js" data-main = "optimized-file.js"></script>'; 
	html += '</head><body style="background-image: url' + "('images/rubber_grip.png')" + '"> </body></html>'; 
	res.send(html); 
	console.log('oh heeeey'); 
}

app.get('/index', sendIndex); 
app.get('/connections', sendIndex); 
app.get('/search', sendIndex); 
app.get('/map', sendIndex); 
app.get('/questions', sendIndex); 
app.get('/profile', sendIndex); 
app.get('/about', sendIndex); 
app.get('/contact', sendIndex); 
app.use(express.static(__dirname));  