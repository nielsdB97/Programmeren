/*
    Posé
    Niels de Bruin
    Klas 06 koraal
    Programmeren 2014-2015
    Hogeschool van Amsterdam
*/

// Set up the game's questions and answers (1 = true, 0 = not true)

var questionAnswer = [
    {
        question: "A whale doesn't have lungs",
        answer: 0
    },
    {
        question: "The human body consists of more than 80% water",
        answer: 1
    },
    {
        question: "The most addictive drug is alcohol",
        answer: 1
    },
    {
        question: "America is the biggest country on earth",
        answer: 0
    },
    {
        question: "Sunglasses block UV radiation",
        answer: 1
    },
    {
        question: "A so called 'sprinter' goes faster than an 'intercity' train",
        answer: 0
    },
    {
        question: "The island Madagaskar is among the continent South-America",
        answer: 0
    },
    {
        question: "Nelson Mandela is a former president of America",
        answer: 0
    },
    {
        question: "The English queen often goes out to eat with the French prime minister",
        answer: 0
    },
    {
        question: "The Greek god of sleep is called Hypnos",
        answer: 1
    },
    {
        question: "The first man to set foot on the moon was Lance Armstrong",
        answer: 0
    },
    {
        question: "Harvard is the oldest University of America",
        answer: 1
    },
    {
        question: "A USB-hub is meant for connecting USB devices over a greater distance",
        answer: 0
    },
    {
        question: "Bonsai is a Chinese art form in which one arranges trees in pots",
        answer: 0
    },
    {
        question: "The statue called 'David' was created by sculptor Michelangelo",
        answer: 1
    },
    {
        question: "The bat is part of the mammalian",
        answer: 1
    },
    {
        question: "The Grand Canyon is several heads of US presidents depicted in a rock wall",
        answer: 0
    },
    {
        question: "America has the most inhabitants in the world",
        answer: 0
    },
    {
        question: "Napoleon Bonaparte came to power through a coup",
        answer: 1
    },
    {
        question: "The most important person in a play is called the protagonist",
        answer: 1
    },
    {
        question: "The cocktail Mojito originates from Spain",
        answer: 0
    },
    {
        question: "The highest mountaintop of Africa is called the Kilimanjaro",
        answer: 1
    },
    {
        question: "Google first launched in 2002",
        answer: 0
    },
    {
        question: "The most often broken human bone is the collarbone",
        answer: 1
    },
    {
        question: "Coca Cola was originally green",
        answer: 1
    },
    {
        question: "Lake Garda is in Switzerland",
        answer: 0
    },
    {
        question: "The wizard in The Hobbit is called Dumbledore",
        answer: 0
    },
    {
        question: "Leonardo da Vinci came from Spain",
        answer: 0
    },
    {
        question: "Shrek from the movie 'Shrek' is an ogre",
        answer: 1
    },
    {
        question: "Paul McCartney is often referred to as 'The king of pop'",
        answer: 0
    }
];

// Global vars & functions

var questionNumber = 0;
var givenAnswer;
var alreadyAsked = [];
var playerPosition = 1;
var i = 1;
function playerStartPosition() {
    var player = document.getElementById("player");
    player.className += " spotNumber1";
}
function generateQuestionNumber() {
    questionNumber = Math.floor( questionAnswer.length * Math.random() );
}
function isAnswerGiven(){
    if (document.querySelector('input[name = "antwoord"]:checked').value !== null){
        givenAnswer = document.querySelector('input[name = "antwoord"]:checked').value;
    }
}
function keyOptionPopup() {
    alert("You can also use your arrow UP and DOWN keys on your keyboard to answer TRUE or FALSE respectively");
}

function keyPress() {
    window.onkeyup = function(event) {
        if (event.which == 38) {
            event.preventDefault();
            document.getElementById("antwoord1").checked = true;
            setTimeout( theGame, 500);
        } else if (event.which == 40) {
            event.preventDefault();
            document.getElementById("antwoord2").checked = true;
            setTimeout( theGame, 500);
        }
    };
}

// Gameboard

function gameboard() {
    for (i = 1; i <= 10; i++) {
        var spot = document.createElement("figure"),
            vaknummer = document.createTextNode(i);
        spot.className += "spot spotNumber" + i;
        spot.appendChild(vaknummer);
        document.getElementById("gameboard").appendChild(spot);
    }
}

// Initiation functions
function startGame() {
    playerStartPosition();
    gameboard();
    generateQuestionNumber();
    placeQuestion();
    keyOptionPopup();
    keyPress();
}
window.onload = startGame();


// THE GAME

function movePlayer() {
    document.getElementById("player").className = "spotNumber" + playerPosition;
}

function wonTheGame() {
    document.getElementById("questionForm").className = "hidden";
    document.getElementsByClassName("wonContainer")[0].className = "appear";
}

function placeQuestion() {
    function publishQuestion() {
        document.getElementById("question").innerHTML = questionAnswer[questionNumber].question;
    }
    if (alreadyAsked.indexOf(questionNumber) === -1) {
        publishQuestion(); // Question not asked yet, so publish the question on the screen
        alreadyAsked.push(questionNumber); // Add this question to the list of questions already asked
    } else if (alreadyAsked.indexOf(questionNumber) >= 0) {
        generateQuestionNumber();
        placeQuestion(); // The question's already been asked, so try another one
    }
    else {
        publishQuestion(); // Just get a question on that screen already!
        alreadyAsked.push(questionNumber); // And please do also add this question to the list of questions already asked..
    }
}

function newQuestion() {
    movePlayer();
    generateQuestionNumber();
    placeQuestion();
}

function theGame() {
    isAnswerGiven();
    if (isNaN(givenAnswer) === false) {
        if (givenAnswer == questionAnswer[questionNumber].answer) { // If both values are equal and so the answer is right
            document.getElementById("rightWrongAlert").innerHTML = "That is right!"; // Give feedback that the given answer is right
            document.getElementById("rightWrongAlert").className = "right";
            if (playerPosition < 10) {
                playerPosition++; // Alright, one step forward!

                if (playerPosition == 10) {
                    movePlayer(); // Move the player to the triumphant last place
                    setTimeout(wonTheGame, 800); // Yaaaaaaay, you won!
                    return true;
                }
            }
        } else if (givenAnswer != questionAnswer[questionNumber].answer) { // If both values are not equal and so the answer is wrong
            document.getElementById("rightWrongAlert").innerHTML = "Too bad, that answer is wrong"; // Give feedback that the given answer is wrong
            document.getElementById("rightWrongAlert").className = "wrong";
            if (playerPosition > 1) {
                playerPosition--; // Too bad, one step backward
            } else if (playerPosition == 1) {
                // Stay on the same position; do nothing
            }
        }
        document.getElementById("questioning").reset();
        newQuestion();
    }
}

document.getElementById("questioning").addEventListener("submit", function(event){
    event.preventDefault();
    theGame();
});
