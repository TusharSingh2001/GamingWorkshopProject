const { json } = require("body-parser");
var express = require( "express" );
var app = express();
var http = require( "http" ).createServer( app );
var io = require( "socket.io" )( http );

app.use( express.static( __dirname ) );
var users = 0;

io.on( "connection", function( socket ){
	console.log( "A user connected" );
	users++;
	socket.username = "Guest " + users;
	socket.position = {
		x : 0,
		y : 0
	}
	socket.color = Math.floor(Math.random()*16777215).toString(16);
	socket.on( "message", function( data ) {
		console.log( socket.username + " sent " + data );
		io.emit( "messagelog", socket.username + ": " + data ); // Guest 1: Hi
	} );
	socket.on( "controls", function( data ) {
		if( data.up ) {
			socket.position.y--;
		}
		if( data.down ) {
			socket.position.y++;
		}
		if( data.right ) {
			socket.position.x++;
		}
		if( data.left ) {
			socket.position.x--;
		}
		io.emit( "gameloop", { id : socket.username, position : socket.position, color : socket.color } );
		// { id : "Guest2", position : { x : 3, y : 5 } }
	} );
	socket.on( "disconnect", function() {
		console.log( "A user disconnected" );
		io.emit( "clear", socket.username );
	} );
} );

var port = 8080;
http.listen( port, function() {
	console.log( "listening on port " + port );
} );