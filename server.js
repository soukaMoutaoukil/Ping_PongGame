var players = [];
var connections = [];
var b;
function Player(id,x,y,v,w,h,p){
	this.id = id;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.points = p;
}

function Ball(id,x,y,xv,yv,r){
	this.id = id;
	this.x = x;
	this.y = y;
	this.xv = xv;
	this.yv = yv;
	this.r = r;
}



var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/start.html');
});
app.use('/', express.static(__dirname + '/'));

var server = serv.listen(3000);
console.log("server started");
var socket = require('socket.io');
var io = socket(server);


function counterConx(){
	io.sockets.emit('counterConx',connections.length);
	console.log(connections.length+" user connected");
}

setInterval(playerList,33);


function playerList(){
	io.sockets.emit('playerList',players);
}

setInterval(ball,33);


function ball(){
	io.sockets.emit('ball',b);
}

/*function wi(){
	for(var i = 0; i < players.length; i++){
		var id = players[i].id ;
		if(players[i].points === 10 ||players[i].points === 11 ){
			msg = "you win";
			//console.log(msg);
			//if ()
		}
		winner ={
			id: id,
			g : msg
		};
		console.log(winner);
		io.sockets.emit('wi', winner);
		//console.log(winner);
	}
}*/
io.sockets.on('connection',function(socket){
	connections.push(socket);
	counterConx();
	socket.on('start',function(data){
		var p = new Player(socket.id,data.x,data.y,data.w,data.h,data.points);
		players.push(p);
	});

	socket.on('startBall',function(data){
		b = new Ball(socket.id,data.x,data.y,data.xv,data.yv,data.r);
	});

	socket.on('disconnect',function(data){
		connections.splice(connections.indexOf(socket),1);
		console.log("disconnected");
	});

	socket.on('playerUpdate',function(data){
		var wich;
		for(var i = 0; i < players.length; i++){
			if(socket.id === players[i].id)
				wich = players[i];
		}
		wich.x = data.x;
		wich.y = data.y;
		wich.v = data.v;
		wich.w = data.w;
		wich.h = data.h;
		wich.points = data.points;
	});

	socket.on('ballUpdate',function(data){
		if (data !== undefined){

			b.x = data.x;
			b.y = data.y;
			b.xv = data.xv;
			b.yv = data.yv;
			b.r = data.r;
		}

	});

});
