//window.onbeforeunload = function() {
//   return "Data will be lost if you leave the page, are you sure?";
//};


let startDeck = ['2_of_clubs','2_of_diamonds','2_of_hearts','2_of_spades',
            '3_of_clubs','3_of_diamonds','3_of_hearts','3_of_spades',
            '4_of_clubs','4_of_diamonds','4_of_hearts','4_of_spades',
            '5_of_clubs','5_of_diamonds','5_of_hearts','5_of_spades',
            '6_of_clubs','6_of_diamonds','6_of_hearts','6_of_spades',
            '7_of_clubs','7_of_diamonds','7_of_hearts','7_of_spades',
            '8_of_clubs','8_of_diamonds','8_of_hearts','8_of_spades',
            '9_of_clubs','9_of_diamonds','9_of_hearts','9_of_spades',
            '10_of_clubs','10_of_diamonds','10_of_hearts','10_of_spades',
            'ace_of_clubs','ace_of_diamonds','ace_of_hearts','ace_of_spades2',
            'jack_of_clubs2','jack_of_diamonds2','jack_of_hearts2','jack_of_spades2',
            'queen_of_clubs2','queen_of_diamonds2','queen_of_hearts2','queen_of_spades2',
            'king_of_clubs2','king_of_diamonds2','king_of_hearts2','king_of_spades2'
]
var deck = JSON.parse(JSON.stringify(startDeck))

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


let dealerHand= [0,0]
let playerHand= [0,0]

let betAmount= 0;

//set set to store locally
let cashAvailable = 1000;
let shownCash = 1000;
setAmounts()


function fillDeck(){
    deck = JSON.parse(JSON.stringify(startDeck));
}


function draw(player, hand){
    let value = deck.splice(Math.floor(Math.random()*deck.length), 1)
    //console.log(`/assests/${value}.png`)
    //console.log(deck.length)

    var img = document.createElement("img");
    img.src = `assests/${value}.png`
    img.style.height = '300px';
    img.style.width = '200px';

    document.getElementById(`${player}Hand`).append(img)


    let cardFace = getValue(`${value}`)
    //console.log(cardFace)


    let cardValue
    if(cardFace === 'king' || cardFace === 'queen'|| cardFace === 'jack'){
        cardValue = 10
    }
    else if(cardFace === 'ace'){
        cardValue = 11
        hand[1]++
    }
    else{
        cardValue = parseInt(cardFace)
    }
    //console.log(cardValue)
    hand[0] += cardValue

    return hand
    
}

//start a game
function newGame(){

    dealerHand = [0,0]
    playerHand= [0,0]
    //code to append card back goes here

    dealerHand = draw("dealer", dealerHand)
    playerHand = draw("player", playerHand)
    playerHand = draw("player", playerHand)
    if(playerHand[0] == 21){
        //blackjack
        stand(dealerHand)
        console.log("Blackjack! Player wins")
    }
}



function stand(dealerHand){
    
    //code to remove card back goes here
    while (dealerHand[0] < 16){
        dealerHand = draw("dealer", dealerHand)
        if(dealerHand[0] > 21){
            aceValue(dealerHand)
        }
    }
    console.log(dealerHand)

    if(dealerHand[0] > 21 || playerHand[0] > dealerHand[0]){
        victor('Player')
    }
    else{
        victor('Dealer')
    }


}


//adds functionality to buttons
document.getElementById('draw').addEventListener('click', function(e){
    playerHand = draw("player", playerHand)
    if(playerHand[0] > 21){
        aceValue(playerHand)
        if(playerHand[0] > 21){
            victor('Dealer')
        }
    }
});
document.getElementById('stand').addEventListener('click', function(e){
    stand(dealerHand)
});


function aceValue(hand){
    while(hand[0] > 21 && hand[1] > 0){
        --hand[1];
        hand[0] = hand[0]-10;
        
    }
    return hand
}


//gets card value from deck array
function getValue(value){
    var card = value.match('^([^_]+)')
    return card[0]
}



function victor(winner){
        modal.style.display = "block";
        if(winner === 'Player'){
            document.getElementById('modalContent').innerHTML = `Player won $${betAmount}!`;
          shownCash += betAmount;
          cashAvailable = shownCash;  
        }
        else{
            document.getElementById('modalContent').innerHTML = `Player lost $${betAmount}!`;
          shownCash -= betAmount;
          cashAvailable = shownCash;  
        }
}

//executes setGame function when pop-up modal is closed
span.onclick = function() {
    setGame()
}
window.onclick = function(event) {
    if (event.target == modal) {
        setGame()
    }
}      
    
    

function setGame(){
    modal.style.display = "none";
    document.getElementById(`dealerHand`).innerHTML = "<h2>Dealer Hand</h2>";
    document.getElementById(`playerHand`).innerHTML = "<h2>Player Hand</h2>";
        
    betAmount = 0
    if(shownCash == 0){
        modal.style.display = "block";
        document.getElementById('modalContent').innerHTML ="You are broke, have $100";
        shownCash =100;
        cashAvailable = shownCash; 
    }
    setAmounts()
}



document.getElementById('start').addEventListener('click', function(e){
    if(betAmount > 0){
        newGame()
    }
})



function setAmounts(){
    document.getElementById('winnings').textContent = `Winnings: $${shownCash}`;
    document.getElementById('betAmount').textContent = `Amount bet: $${betAmount}`;
}

//betting code
document.getElementById('chip1').addEventListener('click', function(e){
    if(cashAvailable >= 100){
        cashAvailable -= 100;
        betAmount += 100;
    }
    setAmounts()
});
document.getElementById('chip2').addEventListener('click', function(e){
    if(cashAvailable >= 500){
        cashAvailable -= 500;
        betAmount += 500;
    }
    setAmounts()
});
