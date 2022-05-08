let deckId
const showcards = document.querySelector("#show-cards")
const remainingcards = document.querySelector("#cardsremaining")
const winner = document.getElementById("win")
const restartBtn = document.getElementById("restart")
const cpuShowScore = document.getElementById("cpuShowScore")
const userShowScore = document.getElementById("userShowScore")
let cpuScore = 0
let userScore = 0

// Restart Game Function
const restartGame = () => {
    cpuScore = 0
    userScore = 0
    handleClick()
    document.getElementById("draw-cards").style.display = "block"
    document.getElementById("new-deck").style.display = "block"
    restartBtn.style.display = "none"
    winner.style.display = "none"
    document.querySelector(".scores").style.display = "none"
}

restartBtn.addEventListener("click", restartGame)

// Score Check Function
const winningCard = (card0,card1,remainingCards) => {
    if(remainingCards == "0"){
        if(cpuScore > userScore){
            document.getElementById("draw-cards").style.display = "none"
            document.getElementById("new-deck").style.display = "none"
            win.innerText = `CPU wins with ${cpuScore - userScore} more Points!` 
            winner.style.display = "block"
            restart.style.display = "block"

        } else if(userScore > cpuScore){
            document.getElementById("draw-cards").style.display = "none"
            document.getElementById("new-deck").style.display = "none"
            win.innerText = `User wins with ${userScore - cpuScore} more Points!` 
            winner.style.display = "block"
            restart.style.display = "block"
        } else if (userScore == cpuScore){
            document.getElementById("draw-cards").style.display = "none"
            document.getElementById("new-deck").style.display = "none"
            winner.style.display = "block"
            win.innerText = "Game is a Draw!"
            winner.style.display = "block"
            restart.style.display = "block"
        }
    } else {
        // Add to CPU Score
        if(card0 == "JACK" || card0 == "QUEEN" || card0 == "KING") {
            cpuScore = cpuScore + 10
        } else if(card0 == "ACE") {
            cpuScore = cpuScore + 11
        } else {
            cpuScore = cpuScore + parseInt(card0)
        }
        // Add to User Score
        if(card1 == "JACK" || card1 == "QUEEN" || card1 == "KING") {
            userScore = userScore + 10
        } else if(card1 == "ACE") {
            userScore = userScore + 11
        } else {
            userScore = userScore + parseInt(card1)
        }
        userShowScore.innerText = userScore
        cpuShowScore.innerText = cpuScore
        document.querySelector(".scores").style.display = "flex"
    }
}

// Get new Deck of Cards Function
function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remainingcards.innerHTML = `<h4>Remaining Cards: ${data.remaining}</h4>`
            showcards.innerHTML = ""
            cpuScore = 0
            userScore = 0
            document.querySelector(".scores").style.display = "none"
        })
}
// Call new Deck of Cards Function
document.getElementById("new-deck").addEventListener("click", handleClick)

document.getElementById("draw-cards").addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            if(deckId != ""){
            showcards.innerHTML = `
                                    <div class="cardpc"><div style="text-align:center;"><h4>Computer:</h4></div><img id="cardpc" src="${data.cards[0].image}"></div>
                                    <div class="carduser"><div style="text-align:center;"><h4>User:</h4></div><img id="carduser" src="${data.cards[1].image}"></div>
                                `
            remainingcards.innerHTML = `<h4>Remaining Cards: ${data.remaining}</h4>`
            // Call Score Check Function
            winningCard(data.cards[0].value,data.cards[1].value,data.remaining)
            }
        })
})