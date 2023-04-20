const cards = ['10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png',
    '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png',
    '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png',
    '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png',
    '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png',
    '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png',
    '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png',
    'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png',
    'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png',
    'queen_of_hearts.png', 'queen_of_spades.png']

const getRandomCard = () => {
    const cardIndex = Math.floor(Math.random() * cards.length)
    const card = cards[cardIndex]
    cards.splice(cardIndex, 1) // remove card from deck
    return card
}

let crupierCards = []
let crupierPoints

let playerCards = []
let playerPoints

// Deal initial cards
crupierCards.push(getRandomCard())
crupierPoints = calculatePoints(crupierCards)

playerCards.push(getRandomCard())
playerPoints = calculatePoints(playerCards)

console.log("Crupier's cards:", crupierCards)
console.log("Crupier's points:", crupierPoints)

console.log("Player's cards:", playerCards)
console.log("Player's points:", playerPoints)

function calculatePoints(cards) {
    let points = 0
    for (const card of cards) {
        const firstElement = card[0]
        let cardPoints = 0
        if (!isNaN(firstElement)) { // number card
            cardPoints = parseInt(firstElement)
        } else if (firstElement !== 'a') {
            cardPoints = 10
        } else {
            if(points + 11 <= 21){
                cardPoints = 11
            }else{
                cardPoints = 1
            }
        }
        points += cardPoints
    }
    return points
}
