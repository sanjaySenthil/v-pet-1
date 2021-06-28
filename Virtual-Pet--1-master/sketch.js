//Create variables here
var dog,dogImg,dogImg1
var foodS
var foodStock
var database


function preload()
{
  	//load images here
    dogImg= loadImage("Sprites/Dog.png")
    dogImg1= loadImage("Sprites/happydog.png")
  }

function setup() {
	createCanvas(500,500);
  database=firebase.database()
  
  dog=createSprite(250,300,150,150)
  dog.addImage(dogImg)
  dog.scale=0.2

  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  
   
  
}


function draw() {  
 background(46, 139, 87)

 if(KeyDown(UP_ARROW)){
   writeStock(foodS)
   dog.addImage(dogImg1)
   
 }



 
  drawSprites();
  //add styles here
  textSize(20)
  fill("white")
  text("food remaining :"+foodS,170,200)
  textSize(12)
  text("note : please press the up arrow key to feed Buddy some milk",130,10)
 
}

function readStock(data){
foodS=data.val()
}
function writeStock(x){
if(x<=0){
x=0
alert("foodStock is over")
}
else{
x=x-1

}
database.ref("/").update({
  Food : x
})
}


