class Ball {
  constructor(){
    this.img = loadImage('image/ball.png');
    this.x = 700;
    this.y = 400;
    this.speedX = 5;
    this.speedY = 5;
    this.xdir = -1;
    this.ydir = -1;
  }

  move(speed){
    this.x += speed*this.xdir;
    this.y += speed*this.ydir;
    if(this.x-34 < 0+this.img.width/2 || this.x-34 > 1280-this.img.width/2){
      this.xdir *= -1;
    }
    if(this.y-37 < 0+this.img.height/2 || this.y-37 > 960-this.img.height/2){
      this.ydir *= -1;
    }
    if(this.x+34>1280+34 || this.x < 0+34 || this.y+37>960+37 || this.y < 37 ){
      noLoop();
      textSize(127);
      strokeWeight(10);
      stroke(255);
      fill('#FF0000');
      textAlign(CENTER, CENTER);
      text('게임 아웃 !!', (1280/2)+34, (960+37)/2);
    }
  }

  hits(other){
    if(other.hands ){
      if(this.x-34-this.img.width/2 < other.x && this.y+37-this.img.height/2 < other.y+other.h && this.y+this.img.height/2 > other.y){
        this.xdir *= -1;
      }
    }else{
      if(this.x+this.img.width/2 > other.x && this.y-37-this.img.height/2 < other.y+other.h && this.y+this.img.height/2 > other.y){
        this.xdir *= -1;
      }
    }

  }

  show(){
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y);
    pop();
  }
}