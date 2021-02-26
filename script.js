const myGame = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let cardsClicked = 0;
let notClicked = false;

let colors = [
  "darkviolet",
  "yellowgreen",
  "deeppink",
  "firebrick",
  "mediumseagreen",
  "lightskyblue",
  "darkviolet",
  "yellowgreen",
  "deeppink",
  "firebrick",
  "mediumseagreen",
  "lightskyblue"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(colors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick); {
      // div.style.color = color;
    }

    // append the div to the element with an id of game
    myGame.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  if (notClicked) return;
  if (e.target.classList.contains("clicked")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!firstCard || !secondCard) {
    currentCard.classList.add("clicked");
    firstCard = firstCard || currentCard;
    secondCard = currentCard === firstCard ? null : currentCard;
  }

  if (firstCard && secondCard) {
    notClicked = true;

    let colorOne = firstCard.className;
    let colorTwo = secondCard.className;

    if (colorOne === colorTwo) {
      cardsClicked += 2;
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      notClicked = false;
    } else {
      setTimeout(function() {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("clicked");
        secondCard.classList.remove("clicked");
        firstCard = null;
        secondCard = null;
        notClicked = false;
      }, 1000);
    }
  }
  if (cardsClicked === colors.length) alert("GAME OVER")
}

// when the DOM loads
createDivsForColors(shuffledColors);
