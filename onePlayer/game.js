var player;
var ball;
var balls = [];
var com;
var lastPos;
var go = false;
var net;
var button;
var canvas;
var son;
function setup(){
   createCanvas(600,400);
  // son = loadSound('"../sounds/hit.mp3"')
//canvas.position(400,50,'absolute');
    player = new Player();
    ball = new Ball();
    for(var i = 0; i < 7; i++){
        balls[i] = new Ball();
    }
    com = new Computer();
    net = {
        x: (width - 2) / 2,
        y: 0,
        height: 10,
        width: 2
    };
}

function drawNet() {

    for (let i = 0; i <= height; i += 15) {
        rect(net.x, net.y + i, net.width, net.height);
       // ctx.fillRect(net.x, net.y + i, net.width, net.height)
    }

}
function draw(){

    background(0);

    drawNet();
    textSize(48);
   // ctx.fill(#5F9EA0);
    fill("#5F9EA0");


    text(player.score,  width/2 - 100, 50);
    text(com.score,  width/2 + 100, 50);
    //ctx.fillText(com.score,  width/2 + 100, 50)

    player.show();
    //move the ball
    player.move(ball);

    ball.show();

    com.show();
    com.move(ball);

    ball.move();

//inverse ball mouvement
    if(ball.collision(player))
        ball.xv = 5;
    if(ball.collision(com))
        ball.xv = -5;
    if(ball.x < 0){
        com.score++;
        throwBall();
    }
    if(ball.x > width){
        player.score++;
        throwBall();
    }
}

function throwBall(){
    if(balls.length > 0)
        ball = balls.pop();
    else {
        showWinner();


    }
}

function showWinner(){
    background(0);
    textSize(50);
    fill("#5F9EA0");
    if(player.score > com.score)
        text("YOU WIN", width/2 - 100, height/2);
    else if(com.score > player.score)
        text("YOU LOSE", width/2 - 100, height/2);
    else
        text("TIE", width/2 -100, height/2);

}
