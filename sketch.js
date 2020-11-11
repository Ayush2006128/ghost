var door,doorImg,ghost,ghostImg,climber,climberImg;
var tower ,towerImg;
var doosGroup,climbersGroup;
var gamestate="play"

function preload(){
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  towerImg=loadImage("tower.png");
  spookysound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  
}
function draw(){
  background(0);
  spookysound.loop();
  if(gamestate==="play"){
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY= ghost.velocityY+0.8
  
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
   if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  sd();
    if(climbersGroup.isTouching(ghost)){
      gamestate="end";
      ghost.velocityY=0;
    }
  }
  
  drawSprites();
  if(gamestate==="end"){
    textSize(30);
    fill("red");
    stroke("red")
    text("Game Over",250,250)
    ghost.destroy();
  }
}
function sd(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY=1;
    door.lifetime=800;
    door.x=Math.round(random(120,400));
    doorsGroup.add(door);
    
    ghost.depth=door.depth;
    ghost.depth= ghost.depth+1;
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY=1;
    climber.lifetime=800;
    climber.x=door.x;   
    climbersGroup.add(climber);
    
  }
}