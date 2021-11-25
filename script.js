
const dom = document.getElementById("the_dom")
const scoreBoard = document.getElementById("score_board")

let maxGuesses = 5
let maxNumber = 10
let guessesLeft = maxGuesses
let score = ""
let secretNumber = ""
let guesses = 0
let guess = 0
let winner = false
let player = ""
let guessedAnswerArray = []
let leaderBoard = []

titleScreen()
addToLeaderBoardToDom(leaderBoard)

function pickSecretNumber() {
    secretNumber = Math.floor(Math.random() * maxNumber)
    console.log(`the secret number is ${secretNumber}`)
}

function titleScreen(){
    dom.innerHTML = ""
    const title = document.createElement("h1")
    title.innerHTML = "Guess The Number Game"
    const startButton = document.createElement("button")
    startButton.innerHTML = "start"
    startButton.type = "submit"
    startButton.addEventListener("click",() => startScreen())
    dom.appendChild(title)
    dom.appendChild(startButton)
}

function startScreen() {
    dom.innerHTML = ""
    const title = document.createElement("h2")
    title.innerHTML = "Welcome by Guess The Number "
    const inputLabel = document.createElement("label")
    inputLabel.innerHTML = "please enter your name:"
    inputLabel.for = "name"
    const input = document.createElement("input")
    input.type = "text"
    input.id = "name"
    input.name = "name"
    const startGame = document.createElement("input")
    startGame.type = "submit"
    startGame.value = "submit"
    startGame.addEventListener("click", () => setPlayerName(input.value))
    dom.appendChild(title)
    dom.appendChild(inputLabel)
    dom.appendChild(input)
    dom.appendChild(startGame)
}

function setPlayerName(x) {
    player = x
    preGame()
}

function preGame(guessedAnswerArray) {
    dom.innerHTML = ""
    guessesLeft = maxGuesses 
    pickSecretNumber()
    const message = document.createElement("div")
    message.innerHTML = `hi ${player} you have ${maxGuesses}  guesses to guess a number between 0 and ${maxNumber}`
    const inputLabel = document.createElement("label")
    inputLabel.for = "numberInput"
    inputLabel.innerHTML = `Pick an number between 0 and ${maxNumber}`
    const input = document.createElement("input")
    input.type = "number"
    input.id = "numberInput"
    input.name = "numberInput"
    input.min = "1"
    input.max =`${maxNumber}`
    const checkButton = document.createElement("button")
    checkButton.type = "submit"
    checkButton.innerHTML ="check"
    const result = document.createElement("div")
    const guessedAnswerList = document.createElement("ul")
    guessedAnswerList.innerHTML = "previous guesses"
    guessedAnswerList.id = "guessed-Answer"
    dom.appendChild(message)
    dom.appendChild(inputLabel)
    dom.appendChild(input)
    dom.appendChild(checkButton)
    dom.appendChild(result)
    dom.appendChild(guessedAnswerList)
    checkButton.addEventListener("click", () => highLowCheck(input.value, result, guessedAnswerArray))
}

function highLowCheck(guess, result){
    guessedAnswerArray.push(guess)
    guessedAnswers(guessedAnswerArray)
    if (guess == secretNumber) {
        score = guessesLeft * 100
        winner = true
        addToLeaderBoard(score)
        winLoseCheck(winner)
    }
    if (guess < secretNumber) {
        result.innerHTML = ` ${guess} to low ${guessesLeft - 1 } guesses left`
        guesses++
        guessesLeft--
    }
    if (guess > secretNumber) {
        result.innerHTML = `${guess} to high ${guessesLeft - 1} guesses left`
        guesses++
        guessesLeft--
    }
    if (guessesLeft == 0) {
        winner = false
       winLoseCheck(winner)
    }
}

function winLoseCheck(winner){
    let endMessage = ""
    if (winner === true)
        endMessage = `  ${secretNumber} is the correct answer your score = ${score} `
        gameEnd(endMessage)
    if (winner === false)
        endMessage = `you ran out of guesses the correct answer was ${secretNumber}`
        gameEnd(endMessage)
}

function guessedAnswers(guessedAnswerArray){
    const list = document.getElementById("guessed-Answer")
    list.innerHTML =""
        guessedAnswerArray.map(guess => {
            const newLi = document.createElement("li")
            newLi.innerHTML = guess
            list.appendChild(newLi)
        })
}

function gameEnd(endMessage){
    dom.innerHTML = ""
    const result = document.createElement("h1")
    result.innerHTML = endMessage
    dom.appendChild(result)
    const  restartButton = document.createElement("button")
    restartButton.type = "submit"
    restartButton.innerHTML = "Restart"
    restartButton.addEventListener("click", () => preGame(resetGame()))
    dom.appendChild(restartButton)
    const newPlayer = document.createElement("button")
    newPlayer.type = "submit"
    newPlayer.innerHTML = "New Player"
    newPlayer.addEventListener("click", () => startScreen(resetNewPlayer()))
    dom.appendChild(newPlayer)
}

function resetNewPlayer(){
    resetGame()
    player = ""
}

function resetGame(){
    guesses = 0
    guess = 0
    winner = false
    guessedAnswerArray = []
}

function addToLeaderBoard(score){
    const newObject = {name: `${player}`, score: `${score}`}
    leaderBoard.push(newObject)
    addToLeaderBoardToDom(leaderBoard)
    console.log(leaderBoard)
}

function addToLeaderBoardToDom(leaderBoard){
    scoreBoard.innerHTML = ""
    const title = document.createElement("h2")
    title.innerHTML = "Score Board"
    // scoreBoard.appendChild(title)
    sortedLeaderBoard = leaderBoard.sort((a, b) => b.score - a.score)
    if (sortedLeaderBoard.length > 0)
                scoreBoard.appendChild(title)
                sortedLeaderBoard.map(object => {
                        const newLi  = document.createElement("li")
                        newLi.innerHTML = `${object.name}  - ${object.score} points`
                        scoreBoard.appendChild(newLi)
                })
    
}
