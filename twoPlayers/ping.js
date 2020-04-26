var socket;
var p1;
var b;
var lastPos;
var go = false;
var players = [];
var counter = 0;
var bn = true;
var net;
function setup(){

    socket = io.connect('http://localhost:3000');
    createCanvas(600,400);
    b = new Ball(width/2,height/2,4,4,15);
    net = {
        x: (width - 2) / 2,
        y: 0,
        height: 10,
        width: 2
    };
    socket.on('getCounter',function(data){
        counter = data;
        print(counter);
        if(p1 === undefined){
            if(counter % 2 === 0 )
                p1 = new Player(0);
            else
                p1 = new Player(width);
        }
        var data = {
            x:p1.x,
            y:p1.y,
            v:p1.velocity,
            w:p1.w,
            h:p1.h,
            points:p1.points
        };
        socket.emit('start',data);

        var data = {
            x:b.x,
            y:b.y,
            xv:b.xv,
            yv:b.yv,
            r:b.r
        };
        socket.emit('startBall',data);

        if(counter === 2){
            go = true;
        }
    });


    socket.on('heartbeat',function(data){
        players = data;
    });

    socket.on('heartbeatBall',function(data){
        if(data !== null){
            b.x = data.x,
                b.y = data.y,
                b.xv = data.xv,
                b.yv = data.yv,
                b.r = data.r
        }
    });

}
function drawNet() {

    for (let i = 0; i <= height; i += 15) {
        rect(net.x, net.y + i, net.width, net.height);
    }

}
function draw(){
    background(0);
   // rect(width/2,0,10,600);
    drawNet();
    textSize(40);
    if(go === false)
        text("Waiting for other player.", width/2 - 200, height/2);
    fill("5F9EA0");
    if(go === true){
        for(var i = 0; i < players.length; i++){
            var id = players[i].id;
            if(id !== socket.id){
                fill("5F9EA0");
                rectMode(CENTER);
                rect(players[i].x,players[i].y,players[i].w,players[i].h);
            }
        }
        showPoints(players);
        p1.show();
        p1.move();
        b.show();
        b.move();
        if(b.collision(p1) && p1.x === 0)
            b.xv = 4;
        if(b.collision(p1) && p1.x === width)
            b.xv = -4;
        if(b.x < 0){
            throwBall();
            if(p1.x === width)
                p1.points++;
        }
        if(b.x > width){
            throwBall();
            if(p1.x === 0)
                p1.points++;
        }
        print(p1.points);
        var data = {
            x:p1.x,
            y:p1.y,
            w:p1.w,
            h:p1.h,
            points:p1.points
        };

        socket.emit('update',data);

        var data = {
            x:b.x,
            y:b.y,
            xv:b.xv,
            yv:b.yv,
            r:b.r
        };
        socket.emit('updateBall',data);
    }}

function throwBall(){
    b.x = width / 2;
    b.y = height /2;
}

function showPoints(p){
    textSize(50);
    fill("5F9EA0");
    for(var i = 0; i < p.length; i++){
        if(p[i].points !== undefined){
            if(p[i].x === 0)
                text(p[i].points.toString(), width/2 - 100, 50);
            else
                text(p[i].points.toString(), width/2 + 100 , 50);
        }
    }
}

