// 5 5 // number of rows and columns
// 1 2 // hoover starting position
// 1 0 // dirt position 
// 2 2 // dirt position  
// 2 3 // dirt position 

// NNESEESWNWW

class Game {
  constructor(numberOfRows, numberOfColumns) {
    this.board = Game.generateBoard(numberOfRows, numberOfColumns)
    this.dirtRemoved = 0
    this.rowsLength = numberOfRows
    this.columnsLength = numberOfColumns
    this.moves = 0
  }

  static generateBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  setHooverPosition(xAxis, yAxis) {
    this.hooverCoords = {
      x: xAxis,
      y: yAxis
    }
    this.board[yAxis][xAxis] = 'Hoover' // set coords on board to current Hoover position
  }

  addDirtToBoard(xAxis, yAxis) {
    let boardPosition = this.board[yAxis][xAxis]

    if (boardPosition !== 'Hoover' || 'Dirt') { // Check to see if board coords already have a value
      this.board[yAxis][xAxis] = 'Dirt'
    }
  }

  moveHoover(xAxis, yAxis) {
    if(this.board[yAxis][xAxis] === 'Dirt') {
      this.dirtRemoved++
    }
    this.board[this.hooverCoords.y][this.hooverCoords.x] = ''
    this.setHooverPosition(xAxis, yAxis)
  }



  makeMove(direction) {
    this.moves++

    switch(direction) {
      case 'N': {
        const yAxis = this.hooverCoords.y + 1
        const xAxis = this.hooverCoords.x
        if(this.hooverCoords.y + 1 > this.rowsLength - 1) {
          console.log("Invalid Move") 
        } else {
          if(this.board[this.hooverCoords.y + 1][this.hooverCoords.x] === 'Dirt') {
            this.dirtRemoved++
          }
          this.board[this.hooverCoords.y][this.hooverCoords.x] = ''
          this.setHooverPosition(this.hooverCoords.x, this.hooverCoords.y + 1)
        }
        break;
      }
      case 'E': {
        if(this.hooverCoords.x + 1 > this.columnsLength - 1) {
          console.log("Invalid Move") 
        } else {
          if(this.board[this.hooverCoords.y][this.hooverCoords.x + 1] === 'Dirt') {
            this.dirtRemoved++
          }
          this.board[this.hooverCoords.y][this.hooverCoords.x] = ''
          this.setHooverPosition(this.hooverCoords.x + 1, this.hooverCoords.y)
        }
        break;
      }
      case 'S': {
        if(this.hooverCoords.y - 1 < 0) {
          console.log("Invalid Move") 
        } else {
          if(this.board[this.hooverCoords.y - 1][this.hooverCoords.x] === 'Dirt') {
            this.dirtRemoved++
          }
          this.board[this.hooverCoords.y][this.hooverCoords.x] = ''
          this.setHooverPosition(this.hooverCoords.x, this.hooverCoords.y - 1)
        }
        break;
      }
      case 'W': {
        if(this.hooverCoords.x - 1 < 0) {
          console.log("Invalid Move") 
        } else {
          if(this.board[this.hooverCoords.y][this.hooverCoords.x - 1] === 'Dirt') {
            this.dirtRemoved++
          }
          this.board[this.hooverCoords.y][this.hooverCoords.x] = ''
          this.setHooverPosition(this.hooverCoords.x - 1, this.hooverCoords.y)
        }
        break;
      }
      default: 
       return "Invalid Move"
    }
  }

}

let game = new Game(5, 5);
game.setHooverPosition(1, 2)

const dirtCoords = [[1, 0], [2, 2], [2, 3]]

for (let i = 0; i < dirtCoords.length; i++) {
  game.addDirtToBoard(dirtCoords[i][0], dirtCoords[i][1])
}

console.log(game.board)

const moves = 'NNESEESWNWW'.split('')

for (let j = 0; j < moves.length; j++) {
  game.makeMove(moves[j])
}

console.log(game.hooverCoords.x, game.hooverCoords.y)
console.log(game.dirtRemoved)

// console.log(game.moves)
// console.log(game.board)






