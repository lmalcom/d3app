var fs 		= require("fs"); 
var express = require("express"); 
var config  = JSON.parse(fs.readFileSync("config.json")); 
var host = config.host; 
var port = config.port; 
var app = express(); 
app.listen(process.env.VCAP_APP_PORT || 3000); 
var socketio = require('socket.io').listen(8800, '107.23.45.102'); 
console.log('starting the server'); 


//basic settings 
app.configure(function(){	
	app.use(express.cookieParser()); 
	app.use(express.session({secret: 'secret variable that gets hashed, omg!'})); 
	app.use(express.bodyParser()); 
	app.use(express.methodOverride()); 
	app.use(app.router); 
	app.use(express.static(__dirname));  
});  

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