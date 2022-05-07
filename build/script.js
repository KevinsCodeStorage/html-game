"use strict";
window.onbeforeunload = function () {
    localStorage.setItem("reserves", JSON.stringify(shownCash));
};
var startDeck = [
    "2_of_clubs",
    "2_of_diamonds",
    "2_of_hearts",
    "2_of_spades",
    "3_of_clubs",
    "3_of_diamonds",
    "3_of_hearts",
    "3_of_spades",
    "4_of_clubs",
    "4_of_diamonds",
    "4_of_hearts",
    "4_of_spades",
    "5_of_clubs",
    "5_of_diamonds",
    "5_of_hearts",
    "5_of_spades",
    "6_of_clubs",
    "6_of_diamonds",
    "6_of_hearts",
    "6_of_spades",
    "7_of_clubs",
    "7_of_diamonds",
    "7_of_hearts",
    "7_of_spades",
    "8_of_clubs",
    "8_of_diamonds",
    "8_of_hearts",
    "8_of_spades",
    "9_of_clubs",
    "9_of_diamonds",
    "9_of_hearts",
    "9_of_spades",
    "10_of_clubs",
    "10_of_diamonds",
    "10_of_hearts",
    "10_of_spades",
    "ace_of_clubs",
    "ace_of_diamonds",
    "ace_of_hearts",
    "ace_of_spades2",
    "jack_of_clubs2",
    "jack_of_diamonds2",
    "jack_of_hearts2",
    "jack_of_spades2",
    "queen_of_clubs2",
    "queen_of_diamonds2",
    "queen_of_hearts2",
    "queen_of_spades2",
    "king_of_clubs2",
    "king_of_diamonds2",
    "king_of_hearts2",
    "king_of_spades2",
];
var deck = JSON.parse(JSON.stringify(startDeck));
var dealerHand = [0, 0];
var playerHand = [0, 0];
var betAmount = 0;
var cashAvailable;
var shownCash;
if (localStorage.getItem("reserves") === null) {
    cashAvailable = 1000;
    shownCash = 1000;
}
else {
    cashAvailable = parseInt(localStorage.getItem("reserves") || "");
    shownCash = parseInt(localStorage.getItem("reserves") || "");
}
setAmounts();
function fillDeck() {
    deck = JSON.parse(JSON.stringify(startDeck));
}
function draw(player, hand) {
    var value = deck.splice(Math.floor(Math.random() * deck.length), 1);
    var img = document.createElement("img");
    img.src = "assets/".concat(value, ".png");
    img.style.height = "200px";
    img.style.width = "130px";
    var handImg = document.getElementById("".concat(player, "Hand"));
    if (handImg)
        handImg.reset();
    if (handImg !== null) {
        handImg.append(img);
    }
    var cardFace = getValue("".concat(value));
    var cardValue;
    if (cardFace === "king" || cardFace === "queen" || cardFace === "jack") {
        cardValue = 10;
    }
    else if (cardFace === "ace") {
        cardValue = 11;
        hand[1]++;
    }
    else {
        cardValue = parseInt(cardFace);
    }
    hand[0] += cardValue;
    return hand;
}
//start a game
function newGame() {
    dealerHand = draw("dealer", dealerHand);
    playerHand = draw("player", playerHand);
    playerHand = draw("player", playerHand);
    if (playerHand[0] == 21) {
        //blackjack
        stand(dealerHand);
    }
}
function stand(dealerHand) {
    //code to remove card back goes here
    while (dealerHand[0] < 16) {
        dealerHand = draw("dealer", dealerHand);
        if (dealerHand[0] > 21) {
            aceValue(dealerHand);
        }
    }
    console.log(dealerHand);
    if (dealerHand[0] > 21 || playerHand[0] > dealerHand[0]) {
        victor("Player");
    }
    else {
        victor("Dealer");
    }
}
//adds functionality to buttons
var drawThing = document.getElementById("draw");
if (drawThing)
    drawThing.reset();
if (drawThing !== null) {
    drawThing.addEventListener("click", function (e) {
        playerHand = draw("player", playerHand);
        if (playerHand[0] > 21) {
            aceValue(playerHand);
            if (playerHand[0] > 21) {
                victor("Dealer");
            }
        }
    });
}
var standThing = document.getElementById("stand");
if (standThing)
    standThing.reset();
if (standThing !== null) {
    standThing.addEventListener("click", function (e) {
        stand(dealerHand);
    });
}
function aceValue(hand) {
    while (hand[0] > 21 && hand[1] > 0) {
        --hand[1];
        hand[0] = hand[0] - 10;
    }
    return hand;
}
//gets card value from deck array
function getValue(value) {
    var card = value.match("^([^_]+)");
    return card[0];
}
function victor(winner) {
    if (modal !== null) {
        modal.style.display = "block";
    }
    if (winner === "Player") {
        var modalWin = document.getElementById("modalContent");
        if (modalWin)
            modalWin.reset();
        if (modalWin !== null) {
            modalWin.innerHTML = "Player won $".concat(betAmount, "!");
        }
        shownCash += betAmount;
        cashAvailable = shownCash;
    }
    else {
        var modalLoss = document.getElementById("modalContent");
        if (modalLoss !== null) {
            modalLoss.innerHTML = "Player lost $".concat(betAmount, "!");
        }
        shownCash -= betAmount;
        cashAvailable = shownCash;
    }
}
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
//executes setGame function when pop-up modal is closed
span.onclick = function () {
    setGame();
};
window.onclick = function (event) {
    if (event.target == modal) {
        setGame();
    }
};
function setGame() {
    modal.style.display = "none";
    var dealHand = document.getElementById("dealerHand");
    if (dealHand !== null)
        dealHand.innerHTML = "<h2>Dealer Hand</h2>";
    var playHand = document.getElementById("playerHand");
    if (playHand !== null)
        playHand.innerHTML = "<h2>Player Hand</h2>";
    betAmount = 0;
    if (shownCash == 0) {
        modal.style.display = "block";
        var modalBroke = document.getElementById("modalContent");
        if (modalBroke !== null)
            modalBroke.innerHTML = "You are broke, have $100";
        shownCash = 100;
        cashAvailable = shownCash;
    }
    setAmounts();
    dealerHand = [0, 0];
    playerHand = [0, 0];
}
var startButton = document.getElementById("start");
if (startButton !== null) {
    startButton.addEventListener("click", function (e) {
        if (betAmount > 0 && playerHand[0] == 0) {
            newGame();
        }
    });
}
function setAmounts() {
    var winnings = document.getElementById("winnings");
    if (winnings !== null)
        winnings.textContent = "Your Cash: $".concat(shownCash);
    var betAmountShown = document.getElementById("betAmount");
    if (betAmountShown !== null)
        betAmountShown.textContent = "Amount bet: $".concat(betAmount);
}
//betting code
var chipOne = document.getElementById("chip1");
if (chipOne !== null) {
    chipOne.addEventListener("click", function (e) {
        if (cashAvailable >= 100 && playerHand[0] == 0) {
            cashAvailable -= 100;
            betAmount += 100;
        }
        setAmounts();
    });
}
var chipTwo = document.getElementById("chip2");
if (chipTwo !== null) {
    chipTwo.addEventListener("click", function (e) {
        if (cashAvailable >= 500 && playerHand[0] == 0) {
            cashAvailable -= 500;
            betAmount += 500;
        }
        setAmounts();
    });
}
