let deck = ['2_of_clubs','2_of_diamonds','2_of_hearts','2_of_spades',
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


function draw(hand, aceCount, player){
    let value = deck[Math.floor(Math.random()*deck.length)]
    console.log(`/assests/${value}.png`)


    var img = document.createElement("img");
    img.src = `assests/${value}.png`
    img.style.height = '300px';
    img.style.width = '200px';

    document.getElementById('playerHand').append(img)


    let cardFace = getValue(value)
    console.log(cardFace)


    let cardValue
    if(cardFace === 'king' || cardFace === 'queen'|| cardFace === 'jack'){
        cardValue = 10
    }
    else if(cardFace === 'ace'){
        cardValue = 11
        aceCount++
    }
    else{
        cardValue = parseInt(cardFace)
    }
    console.log(cardValue)


    return aceCount
    
}

draw()
draw()

function getValue(value){
    var card = value.match('^([^_]+)')
    return card[0]
}

