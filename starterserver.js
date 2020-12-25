var express = require( "express" );
var app = express();
var http = require( "http" ).createServer( app );
var io = require( "socket.io" )( http );

app.use( express.static( __dirname ) );

io.on( "connection", function( socket ){
	console.log( "A user connected" );
	socket.on( "disconnect", function() {
		console.log( "A user disconnected" );
	} );
} );

var port = 8080;
http.listen( port, function() {
	console.log( "listening on port " + port );
} );