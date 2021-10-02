var road,roadIMG,runner,runnerIMG,cactus,cactusIMG,bush,bushIMG,bottle,bottleIMG
var score=0
var deaths=3
var gameState="play"  
function preload(){
roadIMG=loadImage("Road.png")
runnerIMG=loadAnimation("Runner-1.png","Runner-2.png")
cactusIMG=loadImage("cactus.png")
bushIMG=loadImage("dead bush.png")
bottleIMG=loadImage("water bottle.png")
}


function setup(){
  createCanvas(1350,650)
road=createSprite(750,350,1500,700)
road.addImage(roadIMG)
runner=createSprite(350,550)
runner.addAnimation("running",runnerIMG)

runner.scale=0.1
bushG=new Group()
bottleG=new Group()
cactusG=new Group()


}

function draw(){
  background(76,77,79);
  if(gameState === "play"){
drawSprites();
road.scale=0.3
road.velocityY=3
if(road.y > 700){
  road.y=350

}

var r = Math.round(random(1,2))
if (r === 1){
  cactus1()
}
else {
  bush1()
}
if(bottleG.isTouching(runner)){
  bottleG.destroyEach(0)
  score=score+1
}
runner.x=World.mouseX
bottle1()
textSize(25);
fill("red");
text("Scoreboard: "+ score,1100,100)
text("Deaths: "+ deaths,1100,50)
if(cactusG.isTouching(runner)|| bushG.isTouching (runner)){
  deaths=deaths-1
  gameState="end"
}
}
if(gameState === "end"){
  textSize(30)
  fill("pink");
  text("press SPACE to continue",550,300)
  if(keyDown("SPACE")){
    gameState="play"
    cactusG.destroyEach()
    bushG.destroyEach()

  }
  if(deaths===0){
    gameState="over"
 
  }
}
if(gameState === "over"){
  textSize(25);
  fill("red");
  text("GAME OVER! ", 550,300);
  reset=createImg("reset.png");
  reset.position(550,350)
  reset.size(150,50)
  reset.mousePressed(wasp)
}
}
function wasp(){
  gameState="play"
  score=0
  deaths=3
}

function cactus1(){
  if(frameCount % 90 === 0){
    cactus=createSprite(Math.round(random(300,850)),0)
    cactus.addImage(cactusIMG);
    cactus.velocityY=3
    cactus.scale=0.1
    cactus.depth=runner.depth
    runner.depth=runner.depth+1
    cactusG.add(cactus)
    
  }
}

function bush1(){
  if(frameCount % 90 === 0){
    bush=createSprite(Math.round(random(300,850)),0)
    bush.addImage(bushIMG);
    bush.velocityY=3
    bush.scale=0.5
    bush.depth=runner.depth
    runner.depth=runner.depth+1
    bushG.add(bush)
  }
}

function bottle1(){
  if(frameCount % 270 === 0){
    bottle=createSprite(Math.round(random(300,850)),0)
    bottle.addImage(bottleIMG);
    bottle.velocityY=3
    bottle.scale=0.03
    bottle.depth=runner.depth
    runner.depth=runner.depth+1
    bottleG.add(bottle)
  }
}