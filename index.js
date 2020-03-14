let img;
let prevY = null;
let prevX = null;
let h = 0;
let lines = [];
let isGuide = false;
function preload() {
  img = getImage();
}

function setup() {
	createCanvas(windowWidth,windowHeight);
  h = windowHeight - 50;

  button = createButton('戻す');
  button.position(windowWidth/2 - 100, h + 5);
  button.mousePressed(redo);

  button = createButton('完成');
  button.position(windowWidth/2 - 50, h + 5);
  button.mousePressed(stack);

  button = createButton('リセット');
  button.position(windowWidth/2, h + 5);
  button.mousePressed(reset);

  button = createButton('ガイド');
  button.position(windowWidth/2 + 80, h + 5);
  button.mousePressed(guide);

	background(255);
  image(img, windowWidth/2, 0, windowWidth/2, h);
  //image(img, 0, 0);
  rect(0, 0, windowWidth/2, h);
  stroke("#000");
  fill("#fff");
  strokeWeight(1);
  guide();
}

function draw(){
  cursor(CROSS);
  if(mouseIsPressed && mouseX < windowWidth / 2 && mouseY < h){
    if(prevY !== null){
      line(prevX, prevY, mouseX, mouseY);
      lines.push([prevX, prevY, mouseX, mouseY]);
    }
    prevY = mouseY;
    prevX = mouseX;
  } else {
    prevY = null;
    prevX = null;
  }

}

function getImage(){
  return loadImage('https://source.unsplash.com/random/600x600');
}

function reset(){
  image(img, windowWidth/2, 0, windowWidth/2, h);
  rect(0, 0, windowWidth/2, h);
  lines = [];
}

function reWrite(ls){
  for(i = 0; i < ls.length; i++){
    l = lines[i];
    line(l[0],l[1],l[2],l[3]);
  }
}

function stack(){
  image(img, windowWidth/2, 0, windowWidth/2, h);
  push();
  translate(windowWidth/2, 0);
  reWrite(lines);
  pop();
}

function guide(){
  if(isGuide){
    push();
    strokeWeight(0.5);
    line(windowWidth * 1/8, 0, windowWidth * 1/8, h);
    line(windowWidth * 2/8, 0, windowWidth * 2/8, h);
    line(windowWidth * 3/8, 0, windowWidth * 3/8, h);
    line(windowWidth * 5/8, 0, windowWidth * 5/8, h);
    line(windowWidth * 6/8, 0, windowWidth * 6/8, h);
    line(windowWidth * 7/8, 0, windowWidth * 7/8, h);

    line(0, h * 1/4, windowWidth, h * 1/4);
    line(0, h * 2/4, windowWidth, h * 2/4);
    line(0, h * 3/4, windowWidth, h * 3/4);
    pop();
  } else {
    image(img, windowWidth/2, 0, windowWidth/2, h);
    rect(0, 0, windowWidth/2, h);
    reWrite(lines);
  }
  isGuide = !isGuide;
}

function redo(){
  image(img, windowWidth/2, 0, windowWidth/2, h);
  rect(0, 0, windowWidth/2, h);
  lines.pop();
  reWrite(lines);
}

