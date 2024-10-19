// Board factory
function board() {
  let newBoard = () => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push([]);
      for (let j = 0; j < 3; j++) {
        arr[i].push(cell());
      }
    }
    return arr;
  };

  return {
    newBoard,
  };
}

// Cell factory
function cell() {
  let value = "none";

  const getCellValue = () => value;

  const setCellValue = (playerSymbol) => {
    value = playerSymbol;
  };

  return {
    getCellValue,
    setCellValue,
  };
}

// WINNER LOGIC

function winnerLogic(board) {
  let rows = "";
  let columns = "";

  const rowsUpdate = () => {
    board.forEach((row) => {
      row.forEach((obj) => {
        rows += obj.getCellValue();
      });
    });
  };

  const columnsUpdate = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        columns += board[j][i].getCellValue();
      }
    }
  };

  let checkWinner = (current) => {
    let pattern = `${current.plays}${current.plays}${current.plays}`;
    rowsUpdate();
    columnsUpdate();
    if (rows.includes(`${pattern}`) || columns.includes(`${pattern}`)) {
      console.log(`${current.name} wins!`);
    }
  };

  return {
    checkWinner,
  };
}

function gameFlow(playerOneName = "Player One", playerTwoName = "Player Two") {
  //create board
  let boardOBj = board();
  let thisBoard = boardOBj.newBoard();

  //create winner logic
  let winnerObj = winnerLogic(thisBoard);

  //create players
  const playerOne = {
    name: playerOneName,
    plays: "X",
  };

  const playerTwo = {
    name: playerTwoName,
    plays: "O",
  };

  // change current player
  let currentPlayer = playerOne;

  let switchPlayer = (current) => {
    if (current === playerOne) {
      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    }
  };

  let placePlay = (row, column) => {
    const thisValue = thisBoard[row][column].getCellValue();
    if ( thisValue === "none") {
      thisBoard[row][column].setCellValue(currentPlayer.plays);
      updateLogs();
      winnerObj.checkWinner(currentPlayer);
      switchPlayer(currentPlayer);
    } else {
      console.log("Cell already taken");
    }
  };

  //Logs
  const updateLogs = () => {
    let allLog = [];
    thisBoard.forEach((row) => {
      let rowLog = [];
      row.forEach((obj) => {
        rowLog.push(obj.getCellValue());
      });
      allLog.push(rowLog);
    });
    console.clear();
    console.table(allLog);
  };
  updateLogs();

  return {
    placePlay,
  };
}

let game1 = gameFlow();
