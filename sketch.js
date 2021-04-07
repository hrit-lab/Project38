var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy;
var ground, invisibleGround;
var obstaclesGroup;
var score;

function preload(){
}

function setup() {
  createCanvas(600, 200);

  boy = createSprite(50,160,20,50);
  boy.shapeColor = "blue";
  ground = createSprite(1100000000000000000,180,10000000000,20);
  ground.shapeColor = "green";
  ground.x = ground.width /2;
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  obstaclesGroup = createGroup();
  score = 0;
}

function draw() {
  camera.x = boy.x;
  background("yellow");
  fill(0);
  noStroke();
  textSize(10);
  text("Score: "+ score, 230,20);
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
    }
    boy.velocityY = boy.velocityY + 0.8
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
      boy.velocityX = 0;   
    obstaclesGroup.setLifetimeEach(-1);   
     obstaclesGroup.setVelocityXEach(0);
    fill("pink");
    stroke(0);
    strokeWeight(4);
    textSize(30);
      text("GAMEOVER",100,100);
   }
  boy.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.shapeColor = "red";
   obstacle.velocityX = -(6 + score/100);  
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}
