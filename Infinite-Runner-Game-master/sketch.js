const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;
var bananaImage, banana, bananaGroup;
var obstacle, obstacleImage, obstacleGroup
var bckgrd, bckgrdImg;
var score = 0;
var monkey, monkeyAnim, monkeyStop;
var ground;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  bckgrdImg = loadImage("jungle.png");
  
  monkeyAnim = loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  monkeyStop = loadImage("Monkey_01.png");
}

function setup() {
  createCanvas(600,500);

  bckgrd = createSprite (200, 200);
  bckgrd.addImage(bckgrdImg);
  bckgrd.scale = 2;
  
  ground = createSprite (200, 480, 800, 20);
  ground.visible = false;
  
  monkey = createSprite (100, 240, 400, 40);
  monkey.addAnimation("monkeyAnim", monkeyAnim);
  monkey.addImage("monkeyStop", monkeyStop);
  monkey.scale = 0.2;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background(100);

  ground.x = camera.x - 100;
  monkey.x = camera.x - 250;

  monkey.collide(ground);

  if(keyDown("space")){
    monkey.velocityY = -11;
  }  
  monkey.velocityY = monkey.velocityY + 0.5;

  //if (bckgrd.x < camera.x - 200) {
    bckgrd.x = camera.x //- 100 / 2;
  //}

  bananas();
  obstacles();

  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }

  switch(score){
    case 10: monkey.scale = 0.22;
      break;
    case 20: monkey.scale = 0.24;
      break;
    case 30: monkey.scale = 0.26;
      break;
    case 40: monkey.scale = 0.28;
      break;
    default: break;
  }

  if(gameState === END){
    bckgrd.x = 0;
    camera.x = 0;
    
    monkey.velocityY = 0;
    monkey.changeAnimation("monkeyStop", monkeyStop);
    monkey.scale = 0.2;
    
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
  }

  drawSprites();
}

function bananas(){
  if(World.frameCount % 100 === 0){
    banana = createSprite (700, 200, 400, 40);
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.y = random(50,150);

    banana.lifetime = 350; 

    bananaGroup.add(banana);
  } 
}

function obstacles(){
  if(World.frameCount % 300 === 0) {
    obstacle = createSprite (700, 275,400, 40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;

    obstacle.lifetime = 200;

    obstacleGroup.add(obstacle);
  }
}

//Global Variables
/*var bananaImage, banana, bananaGroup, obstacle, obstacleImage, obstacleGroup, bckgrd, bckgrdImg, score, monkey, monkeyAnim, monkeyStop, ground,top, PLAY = 0, END = 1, gameState = PLAY;

function preload(){
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  
  bckgrdImg = loadImage("jungle2.jpg");
  
  monkeyAnim = loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  monkeyStop = loadImage("Monkey_01.png");
}


function setup() {
  createCanvas(600,300);
  
  bckgrd = createSprite (200, 200);
  bckgrd.addImage(bckgrdImg);
  
  ground = createSprite (200, 310, 800, 20);
  
  monkey = createSprite (80, 240, 400, 40);
  monkey.addAnimation("monkeyAnim", monkeyAnim);
  monkey.addImage("monkeyStop", monkeyStop);
  monkey.scale = 0.2;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
}


function draw(){
  background(0); 
  
  monkey.collide(ground);
  
  bckgrd.velocityX = -4;
  if (bckgrd.x < 100){
    bckgrd.x = bckgrd.width / 2;
  }
  
  if(keyDown("space")){
      monkey.velocityY = -11;
  }  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  bananas();
  obstacles();
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  
  switch(score){
    case 10: monkey.scale = 0.22;
      break;
    case 20: monkey.scale = 0.24;
      break;
    case 30: monkey.scale = 0.26;
      break;
    case 40: monkey.scale = 0.28;
      break;
    default: break;
  }
  
  if(gameState === END){
    bckgrd.velocityX = 0;
    
    monkey.velocityY = 0;
    monkey.changeAnimation("monkeyStop", monkeyStop);
    monkey.scale = 0.2;
    
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score, 500, 50);
}

function bananas(){
  if(World.frameCount % 100 === 0){
    banana = createSprite (700, 200, 400, 40);
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.y = random(50,150);
    banana.velocityX = -6;
    banana.lifetime = 350; 
    bananaGroup.add(banana);
  } 
}

function obstacles(){
  if(World.frameCount % 300 === 0) {
    obstacle = createSprite (700, 275,400, 40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}*/