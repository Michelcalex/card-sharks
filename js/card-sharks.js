// STEPS:
// 1-Display a card when the page first loads  ✓
// 1a- use deck of cards API to fetch new cards ✓
// 2-There should be a higher or lower button displayed along the cards
// 3-When the player clicks a button, the new card should be chosen and displayed along with the player's guess
// 3a- if the player guesses correctly, move on to the next card and set the value to that value's card
// 3b- if the player is wrong, alert game over

//Global variables
let cardValues = ['1','2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE'];
let currentCardValue = 0;
let currentRoundDrawn = 0;




//When page load, do this
window.addEventListener('load', function() {
   drawCard();
   higherButton();
});


function drawCard(isHigher) {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    request.addEventListener('load', function () {
        // console.log('The first GET is working');
        if(currentRoundDrawn === 0) {
            let response = JSON.parse(request.responseText);
            // console.log('Response is through');
            showCards(response.cards[0]);
            currentCardValue = cardValues.indexOf(response.cards[0].value)
            // console.log(currentCardValue);
            //higherButton(response.cards[0].value);
            console.log(currentCardValue);
        } else if (isHigher === true) {
            if (currentCardValue < cardValues.indexOf(response.cards[0].value)) {
                currentCardValue = cardValues.indexOf(response.cards[0].value)
            } else {
                alert('game over');
            }  
        } else if (isHigher === false) {
            if(currentCardValue > cardValues.indexOf(response.cards[0].value)) {
                currentCardValue = cardValues.indexOf(response.cards[0].value)
            } else {
                alert('you are wrong');
            }   
        }
    
        currentRoundDrawn++;
    });

    request.send();
    
}


function showCards(card) {
    let cardContainer = document.querySelector('#show-playing-cards');

    let cardImageHolder = document.createElement('img');
    cardImageHolder.src = card.image;
    cardContainer.appendChild(cardImageHolder);
}


function higherButton() {
    let higherBtn = document.querySelector('#higher');
    higherBtn.addEventListener('click', function() {
        //if they click higher, check the current cards value with the next current card value. 
        //display the card on the screen
        //continue play
        drawCard(true);
        // console.log('higher' + currentCardValue);
        // console.log('higher' + cardValues.indexOf(higherGuess))
    });
}


function lowerButton() {
    let lowerBtn = document.querySelector('#lower');
    lowerBtn.addEventListener('click', function() {
        //if they click higher, check the current cards value with the next current card value. 
        //display the card on the screen
        //continue play
        drawCard(false);
        // console.log('higher' + currentCardValue);
        // console.log('higher' + cardValues.indexOf(higherGuess))
    });
}


