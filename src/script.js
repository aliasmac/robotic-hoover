var fs = require('fs');

// Process args from input.txt
var dataArray = fs.readFileSync('input.txt', 'utf8').toString().split("\n");
const boardDimensions = dataArray.slice(0, 1).toString().split(" ")
const startPosition = dataArray.slice(1, 2).toString().split(" ")
const dirtCoords = dataArray.slice(2, -1)
const intructions = dataArray[dataArray.length -1].split("")

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
    this.board[this.hooverCoords.y][this.hooverCoords.x] = '' // ref prev coords 
    this.setHooverPosition(xAxis, yAxis)
  }

  makeMove(direction) {
    this.moves++

    switch(direction) {
      case 'N': {
        const yAxis = this.hooverCoords.y + 1
        const xAxis = this.hooverCoords.x
        if(yAxis > this.rowsLength - 1) {
          console.log("Invalid Move") 
        } else {
          this.moveHoover(xAxis, yAxis)
        }
        break;
      }
      case 'E': {
        const yAxis = this.hooverCoords.y
        const xAxis = this.hooverCoords.x + 1
        if(xAxis > this.columnsLength - 1) {
          console.log("Invalid Move") 
        } else {
          this.moveHoover(xAxis, yAxis)
        }
        break;
      }
      case 'S': {
        const yAxis = this.hooverCoords.y - 1
        const xAxis = this.hooverCoords.x 
        if(yAxis < 0) {
          console.log("Invalid Move") 
        } else {
          this.moveHoover(xAxis, yAxis)
        }
        break;
      }
      case 'W': {
        const yAxis = this.hooverCoords.y 
        const xAxis = this.hooverCoords.x - 1
        if(xAxis < 0) {
          console.log("Invalid Move") 
        } else {
          this.moveHoover(xAxis, yAxis)
        }
        break;
      }
      default: 
       return "Invalid Move"
    }
  }

}

let game = new Game(parseInt(boardDimensions[0]), parseInt(boardDimensions[1]));
game.setHooverPosition(parseInt(startPosition[0]), parseInt(startPosition[1]))

for (let i = 0; i < dirtCoords.length; i++) {
  let coords = dirtCoords[i].split(" ")
  game.addDirtToBoard(parseInt(coords[0]), parseInt(coords[1]))
}

// console.log(game.board)
for (let j = 0; j < intructions.length; j++) {
  game.makeMove(intructions[j])
}

console.log(game.hooverCoords.x, game.hooverCoords.y)
console.log(game.dirtRemoved)

// console.log(game.moves)
// console.log(game.board)

// Need to check what happens if duplicate intructions 
// Review the use of toString



