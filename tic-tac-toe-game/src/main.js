const tiles = document.querySelectorAll(".tile")
const displayPlayer = document.querySelector(".display-turn")
const winningMessage = document.querySelector(".winning-message")
const playerWinDisplay = document.querySelector("#player-win-display")
const reStart = document.querySelector("#restart")
const history = document.querySelector("#history")
const controls = document.querySelector(".controls")
const playAgain = document.querySelector("#play-again")
const previousButton = document.querySelector("#previous")
const nextButton = document.querySelector("#next")
const choosePlayer = document.querySelector(".choose-player")
const playerX = document.querySelector("#player-x")
const playerO = document.querySelector("#player-o")

const board = [['', '', ''],['', '', ''],['', '', '']]
const previousBoardIndex = []
const nextBoardIndex = []

let currentPlayer = ""

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

//Global Fucntion Variables
const checkWin = (currentPlayer)=>{
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return tiles[index].classList.contains(currentPlayer)
    })
  })
}
 
const displayBoard = ()=>{
  let newBoard = board.reduce((initial,current)=>[...initial,...current])
  tiles.forEach((element,index)=>{element.id = `${newBoard[index]}display`})
}

//Add class,index&ValuestoBoards,checkPlayerWin,displayBoardonScreen,
const addFunctionsAndClass = (e)=>{
  const tile = e.target
  const index = Array.from(tile.parentElement.children).indexOf(tile)
  const playerTurn = "X"===currentPlayer ? "O" : "X"
  const indexAndValuestoBoards = ()=>{
    if(index<3){
      board[0][index] = currentPlayer
      previousBoardIndex.push(index)
      }else if(index<6){
      board[1][index-3] = currentPlayer
      previousBoardIndex.push(index)
      }else{
      board[2][index-6] = currentPlayer
      previousBoardIndex.push(index)
      }
  }
  const checkPlayerWin = ()=>{
    if(checkWin(currentPlayer)){
      winningMessage.style.display = "flex"
      playerWinDisplay.innerHTML = `Player <img src="image/${currentPlayer}-tictactoe.png"> Wins!`
      }else if(previousBoardIndex.length===9){
      winningMessage.style.display = "flex"
      playerWinDisplay.innerHTML = "<p id='draw'>Draw!</p>"
      }
  }
  const displayOnScreen = ()=>{
    displayBoard()
    tile.style.cursor = "not-allowed"
    displayPlayer.innerHTML = `Player <img src="image/${playerTurn}-tictactoe.png"> Turn`
  }
 
  if(currentPlayer==="X"){
    tile.classList.add("X")
    indexAndValuestoBoards()
    checkPlayerWin()
    displayOnScreen()
    currentPlayer = "O"
  }else{
    tile.classList.add("O")
    indexAndValuestoBoards()
    checkPlayerWin()
    displayOnScreen()
    currentPlayer = "X"
    }
}
tiles.forEach((tile)=>{tile.addEventListener("click",addFunctionsAndClass,{once:true})})

//HISTORY BUTTONS:
  //Previous Button
const previous = (e)=>{
  let playerTurn = "X"=== currentPlayer ? "O" : "X"
  const index = previousBoardIndex.pop()

  if(currentPlayer === "X"){
    displayPlayer.innerHTML = `Player <img src="image/${playerTurn}-tictactoe.png"> Turn`
    currentPlayer = "O"
  }else{
    displayPlayer.innerHTML = `Player <img src="image/${playerTurn}-tictactoe.png"> Turn`
    currentPlayer = "X"
  }
  
  if(index<3){
    board[0].splice(index,1,'')
    nextBoardIndex.push(index)
  }else if(index<6){
    board[1].splice(index-3,1,'')
    nextBoardIndex.push(index)
  }else{
    board[2].splice(index-6,1,'')
    nextBoardIndex.push(index)
  }

  displayBoard()

  if(previousBoardIndex.length===0){
    e.target.style.cursor = "not-allowed"
    e.target.disabled = true
  }else{
    nextButton.disabled = false
    nextButton.style.cursor = "pointer"
  }
}
previousButton.addEventListener("click",previous)
  //Next Button
const next = (e)=>{
  let playerTurn = "X"=== currentPlayer ? "O" : "X"
  const index = nextBoardIndex.pop()

  if(index<3){
    board[0].splice(index,1,currentPlayer)
    previousBoardIndex.push(index)
  }else if(index<6){
    board[1].splice(index-3,1,currentPlayer)
    previousBoardIndex.push(index)
  }else{
    board[2].splice(index-6,1,currentPlayer)
    previousBoardIndex.push(index)
  }

  displayBoard()

  if(currentPlayer === "X"){
    displayPlayer.innerHTML = `Player <img src="image/${playerTurn}-tictactoe.png"> Turn`
    currentPlayer = "O"
  }else{
    displayPlayer.innerHTML = `Player <img src="image/${playerTurn}-tictactoe.png"> Turn`
    currentPlayer = "X"
  }

  if(nextBoardIndex.length===0){
    e.target.style.cursor = "not-allowed"
    e.target.disabled = true
  }else{
    previousButton.disabled = false
    previousButton.style.cursor = "pointer"
  }
} 
nextButton.addEventListener("click",next)
nextButton.disabled = true
nextButton.style.cursor = "not-allowed"
  //Play Again Button
playAgain.addEventListener("click",()=>location.reload())


//RESTART GAME SECTION:
  //restart button
reStart.addEventListener("click",()=>location.reload())
  //history button
history.onclick = ()=>{
  winningMessage.style.display = "none" 
  controls.style.display = "flex"
  tiles.forEach((tile)=>{tile.removeEventListener("click",addFunctionsAndClass)
                          tile.style.cursor = "not-allowed"})
}

//CHOOSE PLAYER BUTTONS:
playerO.onclick = ()=>{
  currentPlayer = "O"
  choosePlayer.style.display = "none"
  displayPlayer.innerHTML = `Player <img src="image/${currentPlayer}-tictactoe.png"> Turn`
}
playerX.onclick = ()=>{
  currentPlayer = "X"
  choosePlayer.style.display = "none";
  displayPlayer.innerHTML = `Player <img src="image/${currentPlayer}-tictactoe.png"> Turn`
}