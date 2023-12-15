//Initial References

const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-selection");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-btn");
const resultText = document.getElementById("result-text");

//Categories Button 

let options = {
    cities: ["Barcelona","Toulouse","Florence","Shanghai","Sapporo","Milwaukee","Vancouver","Monterrey","Liverpool","Istanbul",],
    animals: ["Armadillo","Alligator","Platypus","Capybara","Ocelot","Weasel","Salamander","Salamander","Antelope","Wolverine",],
    bands: ["Megadeth","Gorillaz","Slipkot","Phoenix","Aerosmith","Nirvana","Radiohead","Foreigner","Coldplay","Soundgarden"],
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

//When a new game is started 
const initializer = () => {
    winCount = 0;
    count = 0;
    displayOptions();
};

window.onload = initializer;
