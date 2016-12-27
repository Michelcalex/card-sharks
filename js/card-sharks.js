console.log('I am working!');

// STEPS:
// 1-Display a card when the page first loads 
// 1a- use deck of cards API to fetch new cards
// 2-There should be a higher or lower button displayed along the cards
// 3-When the player clicks a button, the new card should be chosen and displayed along with the player's guess


window.addEventListener('load', function() {
    getCards();
    gameButtons();
});


function getCards() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    request.addEventListener('load', function() {
        console.log('we got cards!');

        let cardContainer = document.querySelector('#show-playing-cards');

        let response = JSON.parse(request.responseText);
        for(let i = 0; i < response.cards.length; i++) {
            let imageHolder = document.createElement('img');
            imageHolder.src = response.cards[i].image;
            cardContainer.appendChild(imageHolder);
        }

        for(let i = 0; i < 4; i++) {
            if (i < 4) {
                let backOfCard = document.createElement('div');
                backOfCard.classList.add('backCard');
                cardContainer.appendChild(backOfCard);
            }
        }
    });

    request.send();
}



function gameButtons() {
    let higherBtn = document.querySelector('#higher');
    higherBtn.addEventListener('click', function() {
        console.log('I think its higher');
    });

    let lowerBtn = document.querySelector('#lower');
    lowerBtn.addEventListener('click', function() {
        console.log('I think its lower');
    });
}


