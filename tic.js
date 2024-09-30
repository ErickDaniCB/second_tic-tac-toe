// Board factory 
function board () {
  let newBoard = () => {
    let arr = []
    for(let i = 0; i < 3; i++){
      arr.push([])
      for (let j = 0; j < 3; j++) {
        arr[i].push(cell())
      }
    }
    return arr
  }

  return {
    newBoard
  }
}

// Cell factory
function cell () {
  let value = "X"

  const getCellValue = () => value;
  
  const setCellValue = (playerSymbol) => {
    value = playerSymbol;
  }

  return {
    getCellValue,
    setCellValue
  }
}

function gameFlow (playerOneName = "Player One", playerTwoName = "Player Two") {
  const playerOne = {
    name: playerOneName,
    plays: "X"
  }

  const playerTwo = {
    name: playerTwoName,
    plays: "O"
  }

  let currentPlayer = playerOne;

  let switchPlayer = (current) => {
    if(current === playerOne){
      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    }
  } 

  let boardOBj = board();
  let thisBoard = boardOBj.newBoard()
  console.table(thisBoard)
  
  let placePlay = (row, column) => {
    if(typeof thisBoard[row][column] === "object"){
      thisBoard[row][column] = currentPlayer.plays;
      switchPlayer(currentPlayer)
      console.clear();
      console.table(thisBoard);
    }
  }

  return {
    placePlay
  }
}

let game1 = gameFlow();