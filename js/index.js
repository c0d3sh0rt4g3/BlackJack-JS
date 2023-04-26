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

let croupierCards = []
let croupierPoints
let croupierBlackJack

let playerCards = []
let playerPoints
let playerBlackJack

let hasBeenPlayed
let alreadyStopped

let bank = 5000
let bet = 100

let gameWon
let gameTie

function playFirstTime(){
    if (!hasBeenPlayed) {
        if (bank >= bet) {
            bank -= bet
            play()
        } else {
            alert("ERROR: You dont have enough money to place this bet")
        }
    } else{
        play()
    }
}

function play(){
    hasBeenPlayed = true
    croupierCards.push(getRandomCard())
    croupierPoints = calculatePoints(croupierCards)

    playerCards.push(getRandomCard())
    playerPoints = calculatePoints(playerCards)

    document.getElementById("croupiertxt").textContent = "croupier's cards: " + croupierCards + "croupier's points:" + croupierPoints + "\n"
    document.getElementById("bank").textContent = bank
    document.getElementById("playertxt").textContent = "Player's cards: " + playerCards + "\n" + "Player's points:" + playerPoints + "\n"
    if (playerPoints >= 21 || croupierPoints >= 21) {
        end()
        bankCalc()
        croupierCards = []
        playerCards = []
        hasBeenPlayed = ""
        gameTie = ""
        gameWon = ""
    }
    return hasBeenPlayed
}

function playOnlyCroupier(){
    if(hasBeenPlayed && !alreadyStopped){
        alreadyStopped = true
        croupierCards.push(getRandomCard())
        croupierPoints = calculatePoints(croupierCards)

        document.getElementById("croupiertxt").textContent = "croupier's cards: " + croupierCards + "\n" + "croupier's points: " + croupierPoints + "\n"
        end()
        bankCalc()
        croupierCards = []
        playerCards = []
        hasBeenPlayed = ""
        alreadyStopped = ""
        gameTie = ""
        gameWon = ""
        return alreadyStopped
    }else {alert("can't")}
}

function end(){
    if(playerPoints > 21){
        if(croupierPoints > 21){
            document.getElementById("result").textContent = "There's a tie"
            return  gameTie = true
        }else{
            document.getElementById("result").textContent = "You lose"
        }
    }else if(playerPoints <= 21 && playerPoints > croupierPoints){
        if (playerBlackJack){
            document.getElementById("result").textContent = "You scored BlackJack, you win."
        }else if (playerPoints === croupierPoints){
            if (croupierBlackJack){
                document.getElementById("result").textContent = "The croupier scored BlackJack, you lose."
            }else{
                document.getElementById("result").textContent = "There's a tie."
                return  gameTie = true
            }
        }else {
            document.getElementById("result").textContent = "You win."
            return gameWon = true
        }
    }else if(croupierBlackJack){
        document.getElementById("result").textContent = "The croupier scored BlackJack, you lose."
    }else if(croupierPoints > playerPoints && croupierPoints <= 21){
        document.getElementById("result").textContent = "You lose"
    }else{
        document.getElementById("result").textContent = "You win"
        return gameWon = true
    }
}

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
    if(playerPoints > 21 || croupierPoints > 21 || playerBlackJack || croupierBlackJack){
        end()
    }
    return points
}

function bankCalc(){
    if (gameWon){
        bank += bet * 2
    }else if (gameTie){
        bank += bet
    }
}