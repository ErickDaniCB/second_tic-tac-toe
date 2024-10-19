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
  let cross1 = "";
  let cross2 = "";

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

  const cross1Update = () => {
    cross1 =
      board[0][0].getCellValue() +
      board[1][1].getCellValue() +
      board[2][2].getCellValue();
  };
  const cross2Update = () => {
    cross2 =
      board[0][2].getCellValue() +
      board[1][1].getCellValue() +
      board[2][0].getCellValue();
  };

  let checkWinner = (current) => {
    let pattern = `${current.plays}${current.plays}${current.plays}`;
    rowsUpdate();
    columnsUpdate();
    cross1Update();
    cross2Update();
    if (
      rows.includes(`${pattern}`) ||
      columns.includes(`${pattern}`) ||
      cross1.includes(`${pattern}`) ||
      cross2.includes(`${pattern}`)
    ) {
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
    if (thisValue === "none") {
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
