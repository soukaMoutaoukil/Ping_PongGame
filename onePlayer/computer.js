function Computer(){
    this.x = width;
    this.y = height/2;
    this.v = 3;
    this.width = 30;
    this.hieght = 80;
    this.score = 0;

    this.show = function(){
        rectMode(CENTER);
        rect(this.x,this.y,this.width,this.hieght)
    }

    this.move = function(b){
        if(b.x >= width/2)
            if(b.y < this.y)
                this.y -= this.v;
            else if(b.y > this.y)
                this.y += this.v;

    }

}
