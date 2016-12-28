// STEPS:
// 1-Display a card when the page first loads  ✓
// 1a- use deck of cards API to fetch new cards ✓
// 2-There should be a higher or lower button displayed along the cards
// 3-When the player clicks a button, the new card should be chosen and displayed along with the player's guess
// 3a- if the player guesses correctly, move on to the next card and set the value to that value's card
// 3b- if the player is wrong, alert game over


window.addEventListener('load', function() {
   drawCard();

});


function drawCard() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    request.addEventListener('load', function () {
        console.log('The first GET is working');
        let response = JSON.parse(request.responseText);
        console.log('Response is through');
        showCards(response.cards[0]);
    });

    request.send();
    
}


function showCards(card) {
    let cardContainer = document.querySelector('#show-playing-cards');

    let cardImageHolder = document.createElement('img');
    cardImageHolder.src = card.image;
    cardContainer.appendChild(cardImageHolder);
}
