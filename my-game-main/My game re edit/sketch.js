//Creating variables
var credits
var credits2
var playbutton
var spacetokill
var player
var shooterimage, shootingimage
var backgroundimage
var zombieimage
//var zombiegif
var gameState = "Initial"
var heart1, heart2, heart3
var heart1, heart2, heart3
var life = 3
var bullet
var score = 0
var scorebutton
var grenade


function preload(){
  //Loading images/animations etc
  shooterimage = loadAnimation("assets/shooter_1.png", "assets/shooter_2.png");
  shootingimage = loadImage ("assets/shooter_3.png");
  backgroundimage = loadImage("assets/bg.jpg");
  zombieimage = loadImage("assets/zombie1.png");
  //zombiegif = loadAnimation("assets/zombie2.gif");
  playimage = loadImage("assets/playimage.png");
  heart1image = loadAnimation("assets/heart_1.png");
  heart2image = loadAnimation("assets/heart_2.png");
  heart3image = loadAnimation("assets/heart_3.png");
  bulletimage = loadImage("assets/bullet.png");
  scoreboard = loadImage("assets/score.png");
  startcredits = loadImage("assets/credits.png");
  startcredits2 = loadImage("assets/credits2.png");
  presspace = loadImage("assets/spacetokill.png");
  grenadethrow = loadImage("assets/grenade.png");
}

function setup() {
  //Creating the canvas
  createCanvas(600, 350);

  //credits = createSprite(120,180,200,200)
   //credits.addImage(startcredits)
   //credits.scale = 0.5

   //credits2 = createSprite(135,370,200,200)
   //credits2.addImage(startcredits2)
   //credits2.scale = 0.35

  //Creating main player sprite
  player = createSprite(300, 310, 20,80)
  player.addAnimation("shooter", shooterimage);
  player.addAnimation("shooting",shootingimage);
  player.scale = 0.2;

  spacetokill = createSprite(300,100,200,200);
  spacetokill.addImage(presspace);
  spacetokill.scale = 0.5;
  spacetokill.visible = false;

  //Creating Zombie group
  zombiesGroup = createGroup();
  zombiesGroup.debug = true
  
  //Creating playbutton sprite
    playbutton = createSprite(300,50,100,20)
    playbutton.addImage(playimage)
    playbutton.scale = 0.5
    

    //Creating bullet group
   bulletGroup = createGroup();
   //Creating grenade group
   grenadeGroup = createGroup();

   //Creating scorebutton sprite
   scorebutton = createSprite(60,40,100,20)
   scorebutton.addImage(scoreboard)
   scorebutton.scale = 0.3
   scorebutton.visible = false

   //Creating first heart (3 hearts)
   /*heart3 = createSprite(535, 25, 20,20)
   heart3.addImage("heart3",heart3image)
   heart3.scale = 0.2
   heart3.visible = false

   //Creating 2nd heart (2 hearts)
   heart2 = createSprite(514, 25, 20,20)
   heart2.addImage("heart2",heart2image)
   heart2.scale = 0.2
   heart2.visible = false*/

   //Creating 2nd heart (2 hearts)
   heart = createSprite(514, 25, 20,20)
   heart.addAnimation("heart3",heart3image)
   
   heart.scale = 0.2
   heart.visible = false
  
   heart.addAnimation("heart2", heart2image)
   heart.addAnimation("heart1", heart1image)
}


function draw() {

  //Background
  background(backgroundimage);
  drawSprites();

  if(gameState == "Initial"){

    //How to start game
    if(keyDown("enter")){
      gameState = "Play"
    }
  }

  if(gameState == "Play"){
    spacetokill.visible = true
    //credits2.visible = false
    //credits.visible = false
    playbutton.visible = false
    scorebutton.visible = true
    heart.visible = true

    fill ("white")
    text("Score : " +score ,33, 43);

    //Player movement and shoot animation change
    if (keyDown("right") && player.x<570){
      player.x = player.x + 5
    }
    if (keyDown("left") && player.x>30){
      player.x = player.x - 5
    }
    if (keyDown("up") && player.y>60){
      player.y = player.y - 5
    }
    if (keyDown("down") && player.y<300){
      player.y = player.y + 5
    }

    if (keyDown("D") && player.x<570){
      player.x = player.x + 5
    }
    if (keyDown("A") && player.x>30){
      player.x = player.x - 5
    }
    if (keyDown("W") && player.y>60){
      player.y = player.y - 5
    }
    if (keyDown("S") && player.y<300){
      player.y = player.y + 5
    }

    if (keyWentDown("space")){
      player.changeAnimation("shooting",shootingimage);
      createBullet();
      
    } 
    else if(keyWentUp("space")){
      player.changeAnimation("shooter", shooterimage);
      //bullet.visible = false

    }

    
    
    
    
    //creating group for zombies
    zombieSpawn(Math.round(random(10,100)));
    
    //gameState to end
    //if(zombiesGroup.isTouching(player)){
      //gameState = End;
     //}


     if(zombiesGroup.isTouching(bulletGroup)){
      for(var i=0;i<zombiesGroup.length;i++){     
          
       if(zombiesGroup[i].isTouching(bulletGroup)){
            zombiesGroup[i].destroy()
            bulletGroup.destroyEach()
            
     
            score = score+2
            } 
      
      }
    }

     /*if(bulletGroup.isTouching(zombiesGroup)){
 
      //Destroying zombies if they touch bullet
      for(var j=0;j<bulletGroup.length;j++){     
           
       if(bulletGroup[j].isTouching(zombiesGroup)){
            bulletGroup[j].destroy()
            } 
      }
     }*/
     

     //hearts lowering when zombie touches player

     if(zombiesGroup.isTouching(player)){
   
    for(var i=0;i<zombiesGroup.length;i++){     
         
     if(zombiesGroup[i].isTouching(player)){
          zombiesGroup[i].destroy()
         
         life=life-1
         setheartImage()


         
          } 
    
    }
   }
        
       
  console.log("we are in play block")
  if(life == 0){
    gameState = "End"
  }
  }
  
  if(gameState == "End"){
    player.visible = false
    scorebutton.visible = false
    spacetokill.visible = false
    heart.visible = false
   zombiesGroup.pause = true
   player.pause = true
  
  }
}


function zombieSpawn(y){
  if (frameCount % 100 === 0) {

    //creating & spawning zombie at random location
    var zombie = createSprite(Math.round(random(100,600)),y,20,50);

    zombie.addImage(zombieimage);
    zombie.scale = 0.05

    //Giving speed to the zombie
    zombie.velocityX = -1
    zombie.velocityY = 1.5
    zombie.setCollider("rectangle",150,150,600,600)
    //zombie.debug = true

   
    zombiesGroup.add(zombie)
    
    

    //var zombie2 = createSprite(Math.round(random(400,600)),y,20,50);
    //zombie2.addImage(zombiegif);
    //zombie2.scale = 0.05
    //zombie2.velocityX = -1
    //zombie2.velocityY = 1.5
  
    //zombiesGroup.add(zombie2) 

}
}

function createBullet(){

  //Creating bullet
  bullet = createSprite(300,280);
  bullet.addImage(bulletimage);

  //Bullet spawn point
  bullet.x = player.x + 30;
  bullet.y = player.y - 19;

  bullet.scale = 0.05;
  //bullet.visible = false;
  //Bullet speed
  bullet.velocityX = 4;
  bulletGroup.add(bullet);
}

function createGrenade(){
  //creating grenade
  grenade = createSprite(300,280);
  grenade.addImage(grenadethrow);
  grenade.scale = 0.03
  
  //grenade.x = player.x + 30;
  //grenade.y = player.y - 19;
grenadeGroup.add(grenade)

}

function setheartImage(){

  if(life == 3){
    heart.changeAnimation("heart3", heart3image)

  }

  if(life == 2){
   heart.changeAnimation("heart2", heart2image);

  }
 if(life == 1){
   heart.changeAnimation("heart1", heart1image);

 }

}
