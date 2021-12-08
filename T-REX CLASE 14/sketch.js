var trex, treximg, treximgstop

var pizo, ground1, pizoinvis

var nube, nubeimg

var checkpointsonido, jumpsonido, diesonido

var cactus, cactusimg1, cactusimg2, cactusimg3, cactusimg4, cactusimg5, cactusimg6

var score = 0, scoreadd

var estadodeljuego = "estadoinicial"

var grupoestadoinicial, grupocactusinicial

var gameoverimg, gameoversprite, resetimg, resetsprite


function preload(){
  treximg=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  treximgstop=loadImage("trex_collided.png");
  ground1=loadAnimation("ground2.png");
  nubeimg=loadAnimation("cloud.png");
  cactusimg1=loadImage("obstacle1.png");
  cactusimg2=loadImage("obstacle2.png");
  cactusimg3=loadImage("obstacle3.png");
  cactusimg4=loadImage("obstacle4.png");
  cactusimg5=loadImage("obstacle5.png");
  cactusimg6=loadImage("obstacle6.png");
  gameoverimg=loadImage("gameOver.png");
  resetimg=loadImage("restart.png");

  checkpointsonido=loadSound("checkPoint.mp3")
  jumpsonido=loadSound("jump.mp3")
  diesonido=loadSound("die.mp3")
}

function setup(){
  createCanvas(600,225);

  grupoestadoinicial=createGroup();

  grupocactusinicial=createGroup();

  trex=createSprite(50,100,10,10);
  trex.addAnimation("trexrunning", treximg);
  trex.scale=(0.7);
  trex.addImage("treximgstop", treximgstop)

  pizoinvis=createSprite(50,230,10,10)
  grupoestadoinicial.add(pizoinvis);
  pizoinvis.visible=false

  pizo=createSprite(50,220,50,5)
  grupoestadoinicial.add(pizo);
  pizo.addAnimation("ground1img", ground1);

  gameoversprite=createSprite(300,100);
  gameoversprite.addImage("gameoverimg", gameoverimg);
  gameoversprite.visible=false
  gameoversprite.scale=0.5

  resetsprite=createSprite(300,150)
  resetsprite.addImage("resetimg", resetimg)
  resetsprite.visible=false
  resetsprite.scale=0.5
}

function draw(){
  background("white");
  drawSprites();
  /*nubescrear();
  cactuscrear();
  pizomover();*/

  trex.collide(pizoinvis);

  

  if(estadodeljuego === "estadoinicial"){
    estadodeljuego = "playing"
    //console.log("Estado ha sido cambiado a playing");
  }

  if(estadodeljuego === "playing"){
    pizo.velocityX=-(2 * score / 500)
    console.log(pizo.velocityX);
    //console.log("Estado del juego es playing");
    nubescrear();
    pizomover();
    cactuscrear();
    scoreaddfunction();
    //console.log("estado del juego plainyg ha sido aplicado")

    if(grupocactusinicial.isTouching(trex)){
      estadodeljuego = "gameover"
      diesonido.play();
      console.log("Estado ha sido cambiado a gameover")


      if(estadodeljuego === "gameover"){
        trex.velocityY=0
        trex.changeAnimation("treximgstop", treximgstop);
        resetsprite.visible=true
        gameoversprite.visible=true
        if(mousePressedOver(resetsprite)){
          console.log("If de pressedOver resetsprite funciona")
          estadodeljuego = "estadoinicial"
          console.log("Estado del juego ha sido cambiado a estadoinicial")
        }
      }
    }

  }

  //if(trex.isTouching(cactus)){
    //estadodeljuego = "gameover"
  //}

  if(estadodeljuego === "gameover"){
    grupoestadoinicial.setVelocityXEach(0);
    grupocactusinicial.setVelocityXEach(0);

    grupoestadoinicial.setLifetimeEach(-1);
    grupocactusinicial.setLifetimeEach(-1);
  }
}


function scoreaddfunction(){
  if(frameCount % 100 === 0){
    console.log(frameCount);
    score = score + 100
  }
  textSize(15)
  text("SCORE = " + score, 150, 50); 

  if(frameCount % 500 === 0){
    checkpointsonido.play();
  }
}

function cactuscrear(){
  if(frameCount % 150 === 0){
    cactus=createSprite(600,200,5,5);
    cactus.velocityX=-5;
    cactus.scale=0.5;
    var numerorandom=Math.round(random(1,6));

    switch(numerorandom){
      case 1: cactus.addImage(cactusimg1);
      break
      case 2: cactus.addImage(cactusimg2);
      break
      case 3: cactus.addImage(cactusimg3);
      break
      case 4: cactus.addImage(cactusimg4);
      break
      case 5: cactus.addImage(cactusimg5);
      break
      case 6: cactus.addImage(cactusimg6);
      break
      default: break
    }

    grupocactusinicial.add(cactus);

    cactus.lifetime=200

  }
}

function nubescrear(){
  //console.log("nubescrear es activado")
  if(frameCount % 100 === 0){
    //console.log("nubes crear ha sido aplicado")
    nube=createSprite(550,120,1,1);
    grupoestadoinicial.add(nube);
    nube.y=Math.round(random(50, 180));
    nube.addAnimation("nube", nubeimg);
    nube.velocityX=-2
    
    nube.depth=trex.depth
    trex.depth+=1
    
    nube.lifetime=300

  }
}

function pizomover(){
  pizo.velocityX=-6
  if(pizo.x < 0){
    pizo.x=pizo.width / 2
  }

  if(trex.y >= 180 && keyDown("space")){
    trex.velocityY=-10

    jumpsonido.play();
  }

  /*if(frameCount % 500 === 0){
    pizo.velocityX=-(6 + 2 * pizo.velocityX);
    console.log(pizo.velocityX);
  }*/

  trex.velocityY+=0.5
}