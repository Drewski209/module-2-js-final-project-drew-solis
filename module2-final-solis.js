//Initial References

const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-selection");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-btn");
const resultText = document.getElementById("result-text");

//Categories Button 

let options = {
    cities: ["Barcelona","Toulouse","Florence","Shanghai","Sapporo","Milwaukee","Vancouver","Monterrey","Liverpool","Istanbul"],
    animals: ["Armadillo","Alligator","Platypus","Capybara","Ocelot","Weasel","Salamander","Salamander","Antelope","Wolverine",],
    bands: ["Megadeth","Gorillaz","Slipkot","Phoenix","Aerosmith","Nirvana","Radiohead","Foreigner","Coldplay","Soundgarden",],
    video_games: ["Uncharted","Minecraft","Persona","Battlefield","Borderlands","Fallout","Dishonored","Witcher","Wolfenstein","Bloodborne",],
};

  // Count 
let WinCount = 0;
let count = 0;
let chosenWord = "";

//Display Category Buttons 
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
      buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
  };

//Blocks all buttons 
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  
  //disable all options
  optionsButtons.forEach((button) => {
  button.disabled = true;
});

  //Disables all letters 
  letterButtons.forEach((button) => {
    butttons.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};



  //Word Generator 
  const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //If option value  matches the button innerText then highlight the button
    optionsButtons.forEach((button) => {
      if (button.innerText.toLowerCase() === optionValue) {
        button.classList.add("active");
      }
      button.disabled = true;
    });

    //Hides all letters and clears previous word 
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];

    //Choose Random Word 
    chosenWord

};


//When a new game is started 
const initializer = () => {
    winCount = 0;
    count = 0;
    
    //Creates the letter buttons 
    for(let i = 65; i < 91; i++) {
        let button =  document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII [A-Z]
        button.innerText = String.fromCharCode(i);
        letterContainer.append(button);
    }
    displayOptions();
};

//New Game 
newGameButton.addEventListener("click",initializer)
window.onload = initializer;
