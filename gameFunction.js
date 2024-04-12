
//TWO PLAYERS PAGE


const picks=["","Rock","Paper","Scissors"];
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
let p1PickText = document.getElementById("p1");
let p2PickText = document.getElementById("p2");
let p1Pick=0;
let p2Pick=0;
let winText = document.getElementById("win-text");
let winner = document.getElementById("who-wins");
let p1WinText = document.getElementById("p1-win-count");
let p2WinText = document.getElementById("p2-win-count");
p1WinCount=0;
p2WinCount=0;


function realResult(){
  p1PickText.innerText=picks[p1Pick];
  p2PickText.innerText=picks[p2Pick];
}

function pick(score){
  if(p2Pick === 0 && p1Pick === 0){
    p1PickText.innerText=" secret...";

    p1Pick = score;
  } else if(p2Pick === 0 && p1Pick !== 0){
    p2PickText.innerText=" secret..."
    p2Pick = score;
    winner.innerText="Find out who won!"
  }
}

function reset(){
  p1Pick=0;
  p2Pick=0;
  p1PickText.innerText='';
  p2PickText.innerText='';
  winner.innerText='Who will win?';
  winText.innerText='';
  winner.onclick=whoWon;
}
function gameFinish(){
  realResult();
  winner.innerText = "Play again?";
  winner.onclick = reset;
}
function whoWon(){
  if(p1Pick === p2Pick && p1Pick !== 0 && p2Pick !== 0){
    realResult();
    winText.innerText = "It's a tie! Play again?";
    winner.innerText = "Play again?";
    winner.onclick = reset;
  }else if(p1Pick === 1 && p2Pick === 2 || p1Pick === 2 && p2Pick === 3 || p1Pick === 3 && p2Pick === 1){
    gameFinish();
    winText.innerText = "Player 2 won!";
    p2WinCount++;
    p2WinText.innerText=p2WinCount;
  }else if(p1Pick === 2 && p2Pick === 1 || p1Pick === 3 && p2Pick === 2 || p1Pick === 1 && p2Pick === 3){
    gameFinish();
    winText.innerText = "Player 1 won!";
    p1WinCount++;
    p1WinText.innerText= p1WinCount;
  }else if(p2Pick === 0){
    winner.innerText="Make your move first!";
  }
}
rock.onclick = () => pick(1);
paper.onclick = () => pick(2);
scissors.onclick = () => pick(3);
winner.onclick = whoWon;


// COMPUTER


const rock1 = document.getElementById("rock1");
const paper1 = document.getElementById("paper1");
const scissors1 = document.getElementById("scissors1");
const winnerButton = document.getElementById("who-wins2"); 
let playerPickText = document.getElementById('player-pick-text');
let computerPickText = document.getElementById('computer-pick-text');
let winnerText = document.getElementById('win-text1');
let playerWinText = document.getElementById('player-win-count');
let computerWinText = document.getElementById('computer-win-count');
let playerPick = 0;
let computerPick = 0;
let computerWinCount = 0;
let playerWinCount = 0;

function realResult1(){
  playerPickText.innerText=picks[playerPick];
  computerPickText.innerText=picks[computerPick];
}

function pick1(score){
  playerPick = score;
  computerPick = Math.floor(Math.random() * 3) + 1;
  whoWon1();
}
function gameFinish1(){
  realResult1();
  winnerButton.innerText = "Play again?";
  winnerButton.onclick = reset1;
  rock1.onclick= null;
  paper1.onclick = null;
  scissors1.onclick=null;
}
function whoWon1(){
  if(playerPick === computerPick && playerPick !== 0){
    gameFinish1();
    winnerText.innerText = "It's a tie! Play again?";
  }else if(playerPick === 1 && computerPick === 2 || playerPick === 2 && computerPick === 3 || playerPick === 3 && computerPick === 1){
    gameFinish1();
    winnerText.innerText = "Computer won!";
    computerWinCount++;
    computerWinText.innerText = computerWinCount;
  }else if(playerPick === 2 && computerPick === 1 || playerPick === 3 && computerPick === 2 || playerPick === 1 && computerPick === 3){
    gameFinish1();
    winnerText.innerText = "You won!";
    playerWinCount++;
    playerWinText.innerText = playerWinCount;
  }else if(playerPick === 0){
    winnerButton.innerText="Make your move first!";
  }
}

function reset1(){
  playerPick=0;
  computerPick=0;
  playerPickText.innerText='';
  computerPickText.innerText='';
  winnerButton.innerText='Who will win?';
  winnerText.innerText='';
  winnerButton.onclick=whoWon;
  rock1.onclick = () => pick1(1);
  paper1.onclick = () => pick1(2);
  scissors1.onclick = () => pick1(3);
}

//BUTTON FUNCTION

rock1.onclick = () => pick1(1);
paper1.onclick = () => pick1(2);
scissors1.onclick = () => pick1(3);