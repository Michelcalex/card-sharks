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
   lowerButton();
});


function drawCard(isHigher) {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    request.addEventListener('load', function () {
         let response = JSON.parse(request.responseText);
         showCards(response.cards[0]);
         if(currentRoundDrawn === 0) {
            currentCardValue = cardValues.indexOf(response.cards[0].value)
            console.log(currentCardValue);
         } else if (currentRoundDrawn === 4){
            if(isHigher === true) {
                if(currentCardValue < cardValues.indexOf(response.cards[0].value)){
                    alert('YOU WIN!');
                    disablePlay();
                    //console.log('game over - you won!');
                } else {
                    alert('So close...You Loose! Game over');
                    //console.log('you lost on the last cad');
                    disablePlay();
                }
            } else if (isHigher === false) {
                if(currentCardValue > cardValues.indexOf(response.cards[0].value))
                alert('YOU WIN!');
                disablePlay();
                //console.log('game over - you won');
            } else {
                alert('So close..You Loose! - Game over!');
                //console.log('you lost on the last card');
                disablePlay();
            }
         } else if (currentRoundDrawn !== 4) {
            if(isHigher === true) {
                if(currentCardValue < cardValues.indexOf(response.cards[0].value)){
                   currentCardValue = cardValues.indexOf(response.cards[0].value)
                } else {
                    alert('Game Over');
                    //console.log('you lose BEFORE the last round');
                    disablePlay();
                }
            } else if (isHigher === false) {
                if (currentCardValue > cardValues.indexOf(response.cards[0].value)){
                   currentCardValue = cardValues.indexOf(response.cards[0].value)
                } else {
                    alert('Game Over');
                    //console.log('game over, you lost before the last round');
                    disablePlay();
                }  
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
        drawCard(true);
    });
}


function lowerButton() {
    let lowerBtn = document.querySelector('#lower');
    lowerBtn.addEventListener('click', function() {
        drawCard(false);
    });
}

function refreshPage() {
    window.location.reload();
}


function disablePlay() {
    document.getElementById("higher").disabled = true;
    document.getElementById("lower").disabled = true;
}