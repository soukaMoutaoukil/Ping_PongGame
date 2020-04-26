function Player(){
    this.x = 0;
    this.y = height/2;
    this.velocityy = 4;
    this.width = 30;
    this.height = 80;
    this.score = 0;

    this.show = function(){
        rectMode(CENTER);
        rect(this.x,this.y,this.width,this.height)
    }

    this.move = function(b){
        if(b.x < width/2){
            if(player.y < mouseY)
                player.y += player.velocityy;
            else if(player.y > mouseY)
                player.y -= player.velocityy;
        }
    }

}
