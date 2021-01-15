//Create variables here
var dog ,dogImg,happyDog,hdImg;
var foodStock;
var database;
var foodS;
var addFood,feed
var foodObj;
var lastFed;

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png")
  happyDog = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(1600, 700);
  database = firebase.database();
  dog = createSprite(1350,300,20,20);
  dog.addImage(dogImg)
  dog.scale=0.3
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
  addFood = createButton("add")
  addFood.position(800,50);
  addFood.mousePressed(addFoods)

  feed=createButton("feed")
  feed.position(700,50)
  feed.mousePressed(feedDog)

  foodObj = new Food()
}


function draw() {  
  background(46,139,87)
  foodObj.display();
  
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("last Feed : " + lastFed%12 + "pm",350,30)
  } else if(lastFed===0){
    text("last Feed : 12 AM",350,30);
  } else {
    text("lastFeed : "+ lastFed + "AM",350,30)
  }
  drawSprites();
  
}
function readStock(data){
  foodS=data.val();
  console.log(foodS)
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  console.log("x: "+x)
  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


