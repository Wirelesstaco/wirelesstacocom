var nodes = [];
var nodeCount = 70;
var maxDistance = 180;
//let colorSet = ['#351330','#424254','#64908A','#E8CAA4','#CC2A41']


let colorSet = ['#351330','#222831','#30475e','#e8e8e8','#f05454']

let  fontsize = 140;

var actualInnerWidth = document.getElementsByTagName('header')[0].clientWidth;
let containerHeight = document.getElementsByTagName('header')[0].clientHeight;
function setup() {
 
 let canvas = createCanvas(actualInnerWidth,  containerHeight);
  canvas.parent('header-banner');
  //Create nodes
  for(i =0; i<nodeCount; i++){
    var b = new Ball(random(0,windowWidth),random(0,containerHeight));
    nodes.push(b);
  }
}
function windowResized(){
  resizeCanvas(document.getElementById('fullbar').offsetWidth,windowHeight);
 console.log(document.getElementsByClassName('fullbar')[0].offsetWidth);

}

function draw() {

  background(colorSet[1]);

  for(i = 0; i<nodes.length; i++){
    nodes[i].display();
    nodes[i].update();
    drawConnection(i);
  }

}

function drawConnection(theNode){
  node1 = nodes[theNode];
  stroke(node1.color);

  for(j=theNode; j < nodes.length; j++){

    node2 = nodes[j];
    distance = dist(node1.x,node1.y,node2.x,node2.y);
    if(distance < maxDistance){
      if(j != theNode){
        strokeWeight(3 - (distance/maxDistance) *3); // Distance/ max creates line thickness
        line(node1.x,node1.y,node2.x,node2.y);
      }
    }
  }
}

function Ball (x ,y){
  this.size = 8;
  this.x = x;
  this.y = y;
  this.speed = .3;
  this.xSpeed = this.speed * random(-1,1);
  this.ySpeed = this.speed * random(-1,1);
  this.color = color(colorSet[Math.floor(random(2,5))]);

  this.display = function (){
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.size ,this.size );
  }

  this.update = function(){
      if(this.x + this.xSpeed > windowWidth || this.x + this.xSpeed <0){
         this.xSpeed *= -1;
      }else {
        this.x += this.xSpeed;
      }
      if(this.y + this.ySpeed > windowHeight || this.y + this.ySpeed <0){
         this.ySpeed *= -1;
      }else {
        this.y += this.ySpeed;
      }
    }

}
