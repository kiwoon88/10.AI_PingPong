let fs;
let slide;
let poseNet;
let poses = [];
let skeletons = [];
let keypointX = [];
let keypointY = [];
let video;
let ball;
let leftpaddle;
let righttpaddle;
let videoSize = {w: 1280, h: 960};
let mirror = false;
let mirrorImg;

function preload(){
  slide = loadImage('image/slide10.png');
  ball = new Ball();
  leftpaddle = new Paddle(true);
  rightpaddle = new Paddle(false);
}


function setup(){
  screen();
  displayDensity(1);
  createCanvas(displayWidth, displayHeight);
  mirrorImg = createImage(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotResult);
}

function draw(){
  image(slide, 0, 0);
  mirrorCam();
  image(mirrorImg, 34, 37, mirrorImg.width*2, mirrorImg.height*2);
  fill(255, backSlider.value());
  rect(34, 37, videoSize.w, videoSize.h);
  for(let i = 0; i < poses.length; i++){
    if(mirror){
      keypointX[i]=round(video.width-poses[i].position.x)*2+34;
      keypointY[i]=round(poses[i].position.y*2)+37;
    }else{
      keypointX[i]=round(poses[i].position.x*2)+34;
      keypointY[i]=round(poses[i].position.y*2)+37;
    }
  }
  leftpaddle.show();
  rightpaddle.show();
  if(frameCount%5==0){
    leftpaddle.move();
    rightpaddle.move();
  }
  ball.show();
  ball.move(speedSlider.value());  
  ball.hits(leftpaddle);
  ball.hits(rightpaddle);
}

function gotResult(results){
  if(results.length > 0){
    poses = results[0].pose.keypoints;
    skeletons = results[0].skeleton;
  }
}

function mirrorCam(){
  mirrorImg.loadPixels();
  video.loadPixels();

  if(mirror){
    for(let y = 0; y < video.height; y++){
      for(let x = 0; x < video.width; x++){
        let index0 = (x + y*video.width)*4;
        let index1 = (video.width-x+1+(y*video.width))*4;
        mirrorImg.pixels[index1+0] = video.pixels[index0+0];
        mirrorImg.pixels[index1+1] = video.pixels[index0+1];
        mirrorImg.pixels[index1+2] = video.pixels[index0+2];
        mirrorImg.pixels[index1+3] = 255;
      }
    }
  }else{
    for(let y = 0; y < video.height; y++){
      for(let x = 0; x < video.width; x++){
        let index = (x + y*video.width)*4;
        mirrorImg.pixels[index+0] = video.pixels[index+0];
        mirrorImg.pixels[index+1] = video.pixels[index+1];
        mirrorImg.pixels[index+2] = video.pixels[index+2];
        mirrorImg.pixels[index+3] = 255;
      }
    }
  }
  mirrorImg.updatePixels();
}

function screen(){
  screenBtn = createButton(' 전체화면 ');
  mirrorBtn = createButton(' 화면반전 ');
  newBtn = createButton(' 새게임 ');
  stopBtn = createButton(' 게임중지 ');
  backSlider = createSlider(0, 255, 200, 5);
  speedSlider = createSlider(0, 20, 5, 0.5);
  screenBtn.position(1400, 230);
  mirrorBtn.position(1505, 230);
  newBtn.position(1610, 230);
  stopBtn.position(1715, 230);
  backSlider.position(1500, 265);
  speedSlider.position(1500, 285);
  screenBtn.size(100, 30);
  mirrorBtn.size(100, 30);
  newBtn.size(100, 30);
  stopBtn.size(100, 30);
  backSlider.size(300);
  speedSlider.size(300);
  screenBtn. mousePressed(() => {
    fs = fullscreen();
    fullscreen(!fs);

    if (!fs) {
      screenBtn.html(' 전체화면 취소 ');
    } else { 
      screenBtn.html(' 전체화면');
    }
  });
  mirrorBtn.mousePressed(() => {mirror=~mirror;});
  newBtn.mousePressed(()=>{loop();});
  stopBtn.mousePressed(()=>{noLoop();});
}