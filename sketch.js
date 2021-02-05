var bg, bgImg ;
var balloonAnimation, balloonImg02, balloon ;
var edges ;
var balloonxref ; balloonx = 100
var balloonyref ; balloony = 450

function preload(){
  bgImg = loadImage("bgImg.jpg")
  balloonAnimation = loadAnimation("Balloon01.png", "Balloon02.png", "Balloon03.png")
  // createEdgeSprites()
}

function setup() {
  createCanvas(1200,1200)

  bg = createSprite(0,0,1200,600)
  bg.addImage(bgImg)
  bg.scale = 5;

  balloon = createSprite (150,200,100,450)
  balloon.addAnimation("balloon",balloonAnimation )
  balloon.scale = 0.55 ;

  database = firebase.database(); 

}

function draw() {

  database.ref('position/').update({
    x: balloon.x
  });
  database.ref('position/').update({
    y: balloon.y
  });

  balloonxref = database.ref('position/x');
  balloonxref.on("value",function(data){
    balloonx = data.val();
  })
  balloonyref = database.ref('position/y');
  balloonyref.on("value",function(data){
    balloony = data.val();
  })

  balloon.x = balloonx
  balloon.y = balloony


  bg.velocityX = 5 ;

  if (bg.x < 0){
    bg.x = bg.width/2;
  }

  if(keyDown(UP_ARROW)){
    balloon.velocityY = balloon.velocityY-3 ;
    balloon.scale = balloon.scale + 0.005
  } 
  if(keyDown(DOWN_ARROW)){
    balloon.velocityY = balloon.velocityY+3 ;
    balloon.scale = balloon.scale - 0.005
  }
  if(keyDown(RIGHT_ARROW)){
    balloon.velocityX = balloon.velocityX+3 ;
  } 
  if(keyDown(LEFT_ARROW)){
    balloon.velocityX = balloon.velocityX-3 ;
  }
  drawSprites();

  }









