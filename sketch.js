var monkey,monkey_running;
var banana,bananaImage,obstacleImage,ground,invisibleGround;
var FoodGroup,obstacleGroup;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600, 300);
  
 ground = createSprite(300,260,600,1.0);
 ground.x = ground.width /2;
  
 /*obstacle = createSprite(500,250,40,40)
 obstacle.addImage(obstaceImage);
 obstacle.scale = 0.1*/
  
 invisibleGround = createSprite(300,280,700,1.0);
 invisibleGround.visible = false;
  
 monkey = createSprite(100,250,40,40);
 monkey.addAnimation("running", monkey_running);
 monkey.scale = 0.1;
 
 /*banana = createSprite(100,100,20,20)
 banana.addImage(bananaImage);
 banana.scale = 0.1*/
 
 score = 0
  
 obstaclesGroup = new Group();
 foodGroup = new Group();
  
  
  
}


function draw() {
background("lightblue");
  
//text("survival time : "+ score, 450,50);
// score = score + Math.round(frameCount/60);
  
monkey.collide(invisibleGround);
monkey.velocityY = monkey.velocityY + 0.8;
  
if(keyDown("space")) {
        monkey.velocityY = -10;
    }

ground.velocityX = -4;
 if (ground.x < 300){
      ground.x = ground.width/2;
    } 
  
//obstacle.velocityX = -(4 + 3* score/100)
  
spawnobstacle();
spawnfood();
  
  if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    score = score + 1;
    switch(score){
        case 10: monkey.scale=0.14;
                break;
        case 20: monkey.scale=0.16;
                break;
        case 30: monkey.scale=0.18;
                break;
        case 40: monkey.scale=0.20;
                break;
        default: break;
    }
    }
    
  
   if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
      //score=score-2;
    }
  
drawSprites();  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
}

function spawnobstacle() {
   if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,250,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
     
    obstacle.scale = 0.2;
    obstacle.lifetime =300;

    obstaclesGroup.add(obstacle);
       
   
      
  }
    
}

function spawnfood() {
   
    
       
       
       if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.1  ;
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    foodGroup.add(banana);
  }
    }

