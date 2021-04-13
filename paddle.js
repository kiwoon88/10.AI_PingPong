class Paddle {
  constructor(x){
    this.hands = x;
    if(x){
      this.x = 100+34;
    }else{
      this.x = 1180;
    }
    this.y = 0;
    this.w = 20;
    this.h = 170;
  }

  move(){
    if(this.hands){
      this.y = keypointY[9]-250;
    }else{
      this.y = keypointY[10]-250;
    }
    if(this.y<0){
      this.y = 37;
    }else if(this.y+this.h>960+37){
      this.y = 960+37-this.h;
    }
  }

  show(){
    stroke(0);
    fill(0);
    strokeWeight(3);
    if(this.hands){
      line(this.x + 34, this.y, this.x + 34, this.y+170);
    }else{
      line(this.x, this.y, this.x, this.y+170)
    }
    rect(this.x+5, this.y+20, this.w, this.h-40);
  }
}