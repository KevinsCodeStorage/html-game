//window.onbeforeunload = function() {
//    return "Data will be lost if you leave the page, are you sure?";
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


let dealerHand
let playerHand


function fillDeck(){
    deck = JSON.parse(JSON.stringify(startDeck));
}

function draw(player){
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
        //aceCount++
    }
    else{
        cardValue = parseInt(cardFace)
    }
    //console.log(cardValue)


    return cardValue
    
}

//start a game
function newGame(){
    //code to append card back goes here

    dealerHand = draw("dealer")
    playerHand = draw("player")
    playerHand += draw("player")
}



function stand(dealerHand){
    
    //code to remove card back goes here
    while (dealerHand < 16){
        dealerHand += draw("dealer")
        if(dealerHand > 21){
            //acecheck here
        }
    }
    console.log(dealerHand)

    if(dealerHand > 21 || playerHand > dealerHand){
        console.log('Player Wins')
    }
    else{
        console.log('Dealer Wins')
    }


}


//adds functionality to buttons
document.getElementById('draw').addEventListener('click', function(e){
    playerHand += draw("player")
    if(playerHand > 21){
        //acecheck here
        if(playerHand > 21){
            console.log('Dealer Wins')
        }
    }
});
document.getElementById('stand').addEventListener('click', function(e){
    stand(dealerHand)
});


//protocode
function aceValue(hand, aceCount){

    while(hand > 21 && aceCount > 0){
        --aceCount;
        hand = hand-10;
        
    }
    return hand
}


//gets card value from deck array
function getValue(value){
    var card = value.match('^([^_]+)')
    return card[0]
}

