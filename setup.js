
const alpabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let isStarted = false;
// start part
const startPart = document.querySelector(".start-part");
const start = document.querySelector("#start");

// main part
const mainGame = document.querySelector(".main");
mainGame.style.display = "none";
// letters -> buttons
let letters = document.querySelector('.letters');
for(let i of alpabet){
    let button = document.createElement("button")
    button.setAttribute("data-letter","");
    button.textContent = i;
    letters.appendChild(button);
}
let buttons = document.querySelectorAll('[data-letter]')
console.log(buttons);


//life
const life = document.querySelector("#life");
//score
const score = document.querySelector("#score");
//question
const question =  document.querySelector(".question");
//word
const word =  document.querySelector(".word");
//restart
let restart = document.querySelectorAll(".restart");
let loser = document.querySelector(".lose");
//hungman
hungman = new Hangman(life,score,question,word,loser,buttons);


start.addEventListener("click",function(){
    isStarted = true;
    startPart.style.display = "none";
    mainGame.style.display = "grid";
    callGame()
})


function callGame(){
    
    hungman.start();
    hungman.display();
}


buttons.forEach((button) => button.addEventListener("click",function(){
    console.log(button.textContent)
    hungman.checkLetter(button)
    hungman.display()
}))

restart.forEach((res) => res.addEventListener("click",function(){
    hungman.restart()
    buttons.forEach((button) => button.removeAttribute("disabled"))
}))

