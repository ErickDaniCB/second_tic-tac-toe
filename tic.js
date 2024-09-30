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

let actBoard = board();

console.table(actBoard.newBoard())

// Cell factory
function cell () {
  let value = "O"

  const getCellValue = () => value;
  
  const setCellValue = (playerSymbol) => {
    value = playerSymbol;
  }

  return {
    getCellValue,
    setCellValue
  }
}
