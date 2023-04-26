let cards = ['10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png',
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

let bank = 5000
let bet = 0

let gameWon
let gameTie = false
let gameEnded = false

function setBet(betPlaced){
    if(!hasBeenPlayed){
        bet += betPlaced
        document.getElementById("bet").innerHTML = bet
        play()
        return bet
    }else{
        alert("You can only place bets before starting the game")
    }
}


function play(){
    if (bet >= 1){
        if (!gameEnded){
            let croupierCard = getRandomCard()
            croupierCards.push(croupierCard)
            croupierPoints = calculatePoints(croupierCards)
            const croupierImg = document.createElement("img")
            croupierImg.src = `./img/${croupierCard}`
            croupierImg.alt = `${croupierCard}`
            document.getElementById("croupier").appendChild(croupierImg)
            hasBeenPlayed = true
            let playerCard = getRandomCard()
            playerCards.push(playerCard)
            playerPoints = calculatePoints(playerCards)

            const playerImg = document.createElement("img")
            playerImg.src = `./img/${playerCard}`
            playerImg.alt = `${playerCard}`
            document.getElementById("player").appendChild(playerImg)

            document.getElementById("croupierTxt").textContent = "Croupier's points:" + croupierPoints
            document.getElementById("bank").textContent = bank
            document.getElementById("playerTxt").textContent = "Player's points:" + playerPoints
            if (playerPoints >= 21 || croupierPoints >= 21) {
                // check for player blackjack
                if (playerPoints === 21 && playerCards.length === 2) {
                    playerBlackJack = true
                    end()
                    bankCalc()
                    return hasBeenPlayed
                // check for croupier blackjack
                }else if(croupierPoints === 21 && croupierCards.length === 2){
                    croupierBlackJack = true
                    end()
                    bankCalc()
                    return hasBeenPlayed
                }else {
                    end()
                    bankCalc()
                    return hasBeenPlayed
                }
            }
        }else {alert("You cant keep playing this hand, please click play again before keep playing")}
    }else {alert("You cant start playing without placing a bet first.")}
}

/*Si el croupier tiene una puntuación de 16 o menos, debe pedir otra carta. Si tiene una puntuación de 17 o más,
 debe plantarse.*/
function croupierPlay(){
    if (croupierPoints <= 16){
        croupierCards.push(getRandomCard())
        croupierPoints = calculatePoints(croupierCards)
        document.getElementById("croupierTxt").textContent = "Croupier's points: " + croupierPoints
    }
}

function stand(){
    if (hasBeenPlayed){
        croupierPlay()
        end()
        bankCalc()
    }else {alert("You can't stand because the game already ended")}
}

function end(){
    if(playerPoints > 21){
        if(croupierPoints > 21){
            document.getElementById("result").textContent = "There's a tie"
            gameTie = true
        }else{
            document.getElementById("result").textContent = "You lose"
            gameWon = false
        }
    }else if(playerPoints <= 21 && playerPoints > croupierPoints){
        if (playerBlackJack){
            document.getElementById("result").textContent = "You scored BlackJack, you win."
            gameWon = true
        }else {
            document.getElementById("result").textContent = "You win."
            gameWon = true
        }
    }else if(croupierBlackJack){
        document.getElementById("result").textContent = "The croupier scored BlackJack, you lose."
        gameWon = false
    }else if(croupierPoints > playerPoints && croupierPoints <= 21){
        document.getElementById("result").textContent = "You lose"
        gameWon = false
    }else if (playerPoints === croupierPoints){
            if (croupierBlackJack){
                document.getElementById("result").textContent = "The croupier scored BlackJack, you lose."
                gameWon = false
            }else{
                document.getElementById("result").textContent = "There's a tie."
                gameTie = true
            }
        }else{
        document.getElementById("result").textContent = "You win"
        gameWon = true
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
        bankCalc()
    }
    return points
}

function bankCalc(){
    if (gameWon && gameTie === false){
        bank += bet
    }else if (!gameWon && gameTie === false){
        bank -= bet
    }
    document.getElementById("bank").textContent = bank
    gameEnded = true
}

function reset(){
    if (gameEnded){
        document.getElementById("result").textContent = ""
        document.getElementById("player").innerHTML = ""
        document.getElementById("playerTxt").innerHTML = ""
        document.getElementById("croupier").innerHTML = ""
        document.getElementById("croupierTxt").innerHTML = ""
        document.getElementById("bet").innerHTML = ""
        croupierCards = []
        playerCards = []
        hasBeenPlayed = ""
        bet = 0
        gameWon = ""
        gameEnded = false
        gameTie = false
        cards = ['10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png',
        '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png',
        '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png',
        '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png',
        '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png',
        '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png',
        '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png',
        'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png',
        'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png',
        'queen_of_hearts.png', 'queen_of_spades.png']

    }else {alert("You should end the hand before playing again")}
}