//PAGES AND BUTTONS VARIABLE DECLARATION

const introPage = document.getElementById('intro-page');
const twoPlayerPage = document.getElementById('two-players-page');
const computerPlaysPage = document.getElementById('computer-plays-page');
const twoPlayerButton=document.getElementById('two-players');
const backButton1=document.getElementById('back-to-intro1')
const backButton2=document.getElementById('back-to-intro2')
const computerButton=document.getElementById('computer')
let introPageOpacity= Number(window.getComputedStyle(introPage).getPropertyValue("opacity"));
let twoPlayerPageOpacity= Number(window.getComputedStyle(twoPlayerPage).getPropertyValue("opacity"));
let computerPageOpacity= Number(window.getComputedStyle(computerPlaysPage).getPropertyValue("opacity"));
let buttonCheck;

//PARTICLES RELATED VARIABLE DECLARATION

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
const buffer = 800;
ctx.canvas.height = window.innerHeight;
let particleArray1;
let checkpoint=0;
let test = 0.2;
let test1=0;
let intervalID = 0;
const button = document.getElementById('button');


  //CONSTRUCTOR FUNCTION

function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
}

  //UPDATE METHOD
Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (checkpoint===0 && (this.y + this.size > canvas.height || this.y - this.size < 0)) {
    this.directionY = -this.directionY;
  }
  this.x += this.directionX;
  this.y += this.directionY;
  this.draw();
}

  // RANDOM COLOR GENERATOR
function getRandomColor() {
  let startColor = [0xE4, 0xF8, 0xE7];
  let endColor = [0x81, 0xDF, 0x91];

  let randomColor = '#';
  for (let i = 0; i < 3; i++) {
    let startComponent = startColor[i];
    let endComponent = endColor[i];
    let randomComponent = Math.floor(Math.random() * (endComponent - startComponent + 1)) + startComponent;
    randomColor += randomComponent.toString(16).padStart(2, '0');
  }
  return randomColor;
}


  //PARTICLE ARRAY

function init() {
  particleArray1 = [];
  for (let i = 0; i < 200; i++) {
    let size = Math.random() * 20;
    let x = Math.random() * canvas.width;
    let y = Math.random() * (canvas.height + buffer) - buffer;
    let directionX = (Math.random() * .4) - .2;
    let directionY = (Math.random() * .4) - test;
    let color = getRandomColor();

    particleArray1.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

  // ANIMATION
  function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray1.length; i++) {
    particleArray1[i].update();
  } 
}

init();
animate();

 window.addEventListener('resize',
  function () {
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
  }
);

//PAGE TRANSITION

function goDownInit1() {
  buttonCheck=1;
  intervalID = setInterval(goDown, 15);
}
function goDownInit2() {
  buttonCheck=2;
  intervalID = setInterval(goDown, 10);
}
function goDown() {
  checkpoint=1;
  if (introPageOpacity>0) {
    test1+=0.2;
    for (let i = 0; i < particleArray1.length; i++){
      particleArray1[i].directionY += test*0.2;
    }
    introPageOpacity-=0.01;
    introPage.style.opacity = introPageOpacity;
  } else {
    clearInterval(intervalID);
    introPage.style.display="none";
    slowDownInit1();
  }
}
function slowDownInit1(){
  intervalID = setInterval(slowDown, 10);
}
function slowDown(){
  if (test1 > 0) {
    test1-=0.1;
    for (let i = 0; i < particleArray1.length; i++){
      particleArray1[i].directionY -= test*0.1;
    }
  } else {
    clearInterval(intervalID);
    test1=0;
    checkpoint=0;
    if(buttonCheck===1){
      twoPlayerFadeIn();
    }else if(buttonCheck===2){
      computerPageFadeIn();
    }
  }
}
function twoPlayerFadeIn(){
  intervalID=setInterval(showTwoPlayerPage, 8);
}
function showTwoPlayerPage(){
  twoPlayerPage.style.display="flex";
  if(twoPlayerPageOpacity<1){
    twoPlayerPageOpacity+=0.01;
    twoPlayerPage.style.opacity=twoPlayerPageOpacity;
  }else{
    clearInterval(intervalID);
  }
}
function computerPageFadeIn(){
  intervalID=setInterval(showComputerPage, 8);
}
function showComputerPage(){
  computerPlaysPage.style.display="flex";
  if(computerPageOpacity<1){
    computerPageOpacity+=0.01;
    computerPlaysPage.style.opacity=computerPageOpacity;
  }else{
    clearInterval(intervalID);
  }
}



function twoPlayerToIntro(){
  checkpoint=1;
  intervalID=setInterval(twoPlayerFadeOut, 15);
}

function twoPlayerFadeOut(){
  if (twoPlayerPageOpacity>0){
    test1+=0.2;
    for (let i = 0; i < particleArray1.length; i++){
      particleArray1[i].directionY -= test*0.2;
    }
    twoPlayerPageOpacity-=0.01;
    twoPlayerPage.style.opacity=twoPlayerPageOpacity;
  } else {
    clearInterval(intervalID);
    twoPlayerPage.style.display="none";
    reset();
    p2WinCount=0;
    p2WinText.innerText=p2WinCount;
    p1WinCount=0;
    p1WinText.innerText=p1WinCount;
    slowDownInit2();
  }
}
function slowDownInit2(){
  intervalID=setInterval(slowDown2,10);
}
function slowDown2(){
  if (test1 > 0) {
    test1-=0.1;
    for (let i = 0; i < particleArray1.length; i++){
      particleArray1[i].directionY += test*0.1;
    }
  } else {
    clearInterval(intervalID);
    test1=0;
    checkpoint=0;
    introFadeIn();
  }
}
function introFadeIn(){
  intervalID=setInterval(showIntroPage, 8);
}

function showIntroPage(){
  introPage.style.display="flex";
  if(introPageOpacity<1){
    introPageOpacity+=0.01;
    introPage.style.opacity=introPageOpacity;
  }else{
    clearInterval(intervalID);
  }
}



function computerPageToIntro(){
  checkpoint=1;
  intervalID=setInterval(computerPageFadeOut, 15);
}

function computerPageFadeOut(){
  if (computerPageOpacity>0){
    test1+=0.2;
    for (let i = 0; i < particleArray1.length; i++){
      particleArray1[i].directionY -= test*0.2;
    }
    computerPageOpacity-=0.01;
    computerPlaysPage.style.opacity=computerPageOpacity;
  } else {
    clearInterval(intervalID);
    reset1();
    playerWinCount=0;
    playerWinText.innerText=playerWinCount;
    computerWinCount=0;
    computerWinText.innerText=computerWinCount;
    computerPlaysPage.style.display="none";
    slowDownInit2();
  }
}

// PAGE TRANSITION BUTTONS

twoPlayerButton.addEventListener('click', goDownInit1);
computerButton.addEventListener('click', goDownInit2);
backButton1.addEventListener('click', twoPlayerToIntro);
backButton2.addEventListener('click', computerPageToIntro);