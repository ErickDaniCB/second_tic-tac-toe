// Board factory 
function board () {
  let boardArr = () => {
    let arr = []
    for(let i = 0; i < 3; i++){
      arr.push([])
      for (let j = 0; j < 3; j++) {
        arr[i].push([])
      }
    }
    return arr
  }

  return {
    boardArr
  }
}

let actBoard = board();

console.table(actBoard.boardArr())

