//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const resultText = document.getElementById("result-text");
const canvas = document.getElementById("canvas");
const countdown = document.getElementById("countdown");

// Audio Files 
let CORRECT_LETTER = new Audio('correct_letter.wav');
let INCORRECT_LETTER = new Audio('incorrect_letter.wav');
let CORRECT_WORD = new Audio('won_game.wav');
let INCORRECT_WORD = new Audio('lost_game.wav');
let OPTION_SELECT = new Audio('option_select.wav');

// Set volumes for all audio files 
CORRECT_LETTER.volume = 0.1;
INCORRECT_LETTER.volume = 0.1;
CORRECT_WORD.volume = 0.5;
INCORRECT_WORD.volume = 0.5;
OPTION_SELECT.volume = 0.1;

//Categories Button 
let options = {
    cities: ["Barcelona","Toulouse","Florence","Shanghai","Sapporo","Milwaukee","Vancouver","Monterrey","Liverpool","Istanbul",],
    animals: ["Armadillo","Alligator","Platypus","Capybara","Ocelot","Weasel","Salamander","Salamander","Antelope","Wolverine",],
    bands: ["Megadeth","Gorillaz","Slipknot","Phoenix","Aerosmith","Nirvana","Radiohead","Foreigner","Coldplay","Soundgarden",],
    video_games: ["Uncharted","Minecraft","Persona","Battlefield","Borderlands","Fallout","Dishonored","Witcher","Wolfenstein","Bloodborne",],
};

// Count 
let WinCount = 0;
let count = 0;
let chosenWord = "";
let intervalid;

function startInterval() {
  intervalid = setInterval(updateCountdown,1000);
};

//Display Category Buttons 
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
      buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}'); startInterval(); OPTION_SELECT.play() ">${value}</button>`;
      
    }
    optionsContainer.appendChild(buttonCon);
};



//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //Disable all options when one is already selected 
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //Disable all letter buttons 
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

  //Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If option value matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //Chooses a random word from the different categories 
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //Replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;

};

//When a new game is started, this part of the code erases the previous game to start a new game 
const initializer = () => {
  winCount = 0;
  count = 0;
    
  //Initially erases all content
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  countdown.innerHTML = "";
  time = startingMinutes * 60;

  //Creates the letter buttons 
  for(let i = 65; i < 91; i++) {
    let button =  document.createElement("button");
      button.classList.add("letters");
      //Number to ASCII [A-Z]
      button.innerText = String.fromCharCode(i);
      //Character Button Click
      button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");

      //If array contains clicked value replace the matched dash with letter else draw canvas 
        if(charArray.includes(button.innerText)){
          charArray.forEach((char,index) => {
          //If character in array is the same as clicked button
            if(char === button.innerText){
              //Replaces dash with a letter if it matches with the selected word 
              dashes[index].innerText = char;
              CORRECT_LETTER.play();
              //increment counter
              winCount += 1;
              //if WinCount equals word length 
              if(winCount === charArray.length) {
                resultText.innerHTML = `<h2 class='win-msg'>You Win</h2><p>The word was <span>${chosenWord}</span></p>`;
                CORRECT_WORD.play();
                //Blocks all buttons after winning 
                blocker();
                }
              }
            });
          }
              else{
          //Lose count 
          count += 1;
          //Draws man
          drawMan(count);
          INCORRECT_LETTER.play();
          //If count reaches 6, the player loses the game 
          if(count === 6 ) {
            resultText.innerHTML = `<h2 class='lose-msg'>You Lose</h2><p>The word was <span>${chosenWord}</span></p>`;
            INCORRECT_WORD.play();

            blocker();
          }
        }
        button.disabled = true;
        });
        letterContainer.append(button);
    }
    displayOptions();
    // Canvas Creator
    let {initialDrawing} = canvasCreator();
    // Initial drawing is the frame
    initialDrawing();
};

// Canvas 
const canvasCreator = () => {  
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "rgb(51,255,51)";
  context.lineWidth = 4;

  //For drawing lines 
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
  // Draws the head 
  const head = () => {
    context.beginPath();
    context.arc(70,30,10,0, Math.PI * 2, true);
    context.stroke();
  };
  //Draws the body
  const body = () => {
    drawLine(70,40,70,80);
  };
  //Draws the left arm
  const leftArm = () => {
    drawLine(70,50,50,70);
  };
  //Draws the right arm 
  const rightArm = () => {
    drawLine(70,50,90,70);
  };
//Draws the left leg 
  const leftLeg = () => {
    drawLine(70,80,50,110);
  };
//Draws the right leg 
  const rightLeg = () => {
    drawLine(70,80,90,110);
  };
  // Initial Frame
  const initialDrawing = () => {
    //Clears Drawing and frame
    context.clearRect(0,0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };
  return {initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg};

};

// Draw the man, as the incorrect letter is guessed 
const drawMan = (count) => {
  let {head, body, leftArm, rightArm, leftLeg, rightLeg} = canvasCreator();
  switch (count) {
    case 1: 
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4: 
      rightArm();
      break;
    case 5: 
      leftLeg();
      break;
    case 6: 
      rightLeg();
    default:
      break;
  }
};

// Countdown timer 
const startingMinutes = 2;
let time = startingMinutes * 60;

  // Function that makes the countdown timer work 
  function updateCountdown () {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countdown.innerHTML = `${minutes}:${seconds}`;
  time--;
  // Once the timer reaches 0, the game is over and shows the time over screen 
  if(time == 0 ) {
    INCORRECT_WORD.play();
    resultText.innerHTML = `<h2 class='time-over'>Time Over</h2><p>The word was <span>${chosenWord}</span></p>`;
    clearInterval(intervalid);
    blocker();
  }
};



//New Game 
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
