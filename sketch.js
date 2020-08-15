//Create variables here
var dog, dogIMG;
var happyDog, happyDogIMG;
var database;
var foodS,foodStock;
var feedDrago,foodAdd;
var fedTime,lastFed;
var foodObj;




function preload()
{
  //load images here
  dogIMG=loadImage("Dog.png");
  happyDogIMG=loadImage("happydog.png");
}

function setup() {
 
  database = firebase.database();
 createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogIMG);
  dog.scale=0.15;
  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);

  var foodObj=new Food();

  feed=createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDrago);

  addFood=createButton("Add foods");
  
  addFood.position(600,95);
  addFood.mousePressed(foodAdd);
  
}


function draw() {  
  background(46,139,87);

  //if(keyWentDown(UP_ARROW)){
 // writeStock(foodS);
  // dog.addImage(happyDogIMG);}


//  foodStock.update('Food')
  drawSprites();
  //add styles here
 fill(255,255,254);
 textSize(15);

 if(lastFed=>12){
 text("Last Feed :" + lastFed%12 +"12 PM",350,30);
 }else if(lastFed===0){
   text("Last Feed : 12AM",350,30 );
 }else{
   text("Last Feed :"+lastFed+"AM",150,100);
 }

 stroke("black");

 text("Food remaining:"+foodS,170,200);
 textSize(13);
 


 display(foodObj);

 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });
  

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
   x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDrago(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()

  })

}

function foodAdd(){
  foodS++;
  database.ref('/').update({
food:foodS
  })
}

function deductFood(){
  if(feedDrago){
    foodS-1;
  }
}



