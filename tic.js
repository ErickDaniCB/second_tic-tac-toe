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
  
  let rows = "";
  let columns = "";


  let checkWinner = (current) => {
    for(let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++) {
        if(typeof thisBoard[i][j] === "string"){
          rows += thisBoard[i][j]
        } else {
          rows += "n"
        }
      }
    }
    if(rows.includes(`${current.plays}${current.plays}${current.plays}`)){
      console.log(`${current.name} wins`)
    }

    for(let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++) {
        if(typeof thisBoard[j][i] === "string"){
          columns += thisBoard[j][i]
        } else {
          columns += "n"
        }
      }
    }
    if(columns.includes(`${current.plays}${current.plays}${current.plays}`)){
      console.log(`${current.name} wins`)
    }

    

  }

  let boardOBj = board();
  let thisBoard = boardOBj.newBoard()
  console.table(thisBoard)
  
  let placePlay = (row, column) => {
    if(typeof thisBoard[row][column] === "object"){
      thisBoard[row][column] = currentPlayer.plays;
      console.clear();
      console.table(thisBoard);
      checkWinner(currentPlayer);
      switchPlayer(currentPlayer)
    }
  }

  return {
    placePlay
  }
}

let game1 = gameFlow();