var fs = require('fs');

// Process args from input.txt
const dataArray = fs.readFileSync('input.txt', 'utf8').split("\n");
const boardDimensions = dataArray.slice(0, 1).toString().split(" ")
const startPosition = dataArray.slice(1, 2).toString().split(" ") 
const dirtCoords = dataArray.slice(2, -1)
const intructions = dataArray[dataArray.length -1].split("")

class Game {
  constructor(numberOfColumns=5, numberOfRows=5) {
    this.board = Game.generateBoard(numberOfRows, numberOfColumns)
    this.columnsLength = numberOfColumns
    this.rowsLength = numberOfRows
    this.dirtRemoved = 0
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
    this.hooverCoords = { // Navigation compass
      x: xAxis,
      y: yAxis
    }
    this.board[yAxis][xAxis] = 'Hoover' // set coords on board to current Hoover position
  }

  addDirtToBoard(dirtCoords) {
    for (let i = 0; i < dirtCoords.length; i++) {
      let coords = dirtCoords[i].split(" ")
      this._addDirtToCoordinates(parseInt(coords[0]), parseInt(coords[1]))
    }
  }

  playGame(intructions) {
    for (let i = 0; i < intructions.length; i++) {
      this._makeMove(intructions[i])
    }
  }

  _addDirtToCoordinates(xAxis, yAxis) {
    const xMax = this.columnsLength - 1
    const yMax = this.rowsLength - 1
    
    // Check to see coords are valid
    if (xAxis > xMax || xAxis < 0 || yAxis > yMax || yAxis < 0) {
      console.log(`(x)${xAxis} and (y)${yAxis} is an invalid input and has not been submitted to the program!`)
      return 
    }

    let boardPosition = this.board[yAxis][xAxis]
    if (boardPosition !== 'Dirt' && boardPosition !== 'Hoover') { // Check to see if board coords already have a value
      this.board[yAxis][xAxis] = 'Dirt'
    } else {
      console.log(`(x)${xAxis} and (y)${yAxis} is already occupied!`)
    }
  }

  _moveHoover(xAxis, yAxis) {
    if(this.board[yAxis][xAxis] === 'Dirt') {
      this.dirtRemoved++
    }
    this.board[this.hooverCoords.y][this.hooverCoords.x] = '' // ref prev coords 
    this.setHooverPosition(xAxis, yAxis)
  }

  _makeMove(direction) {
    this.moves++

    switch(direction) {
      case 'N': {
        const yAxis = this.hooverCoords.y + 1
        const xAxis = this.hooverCoords.x
        if (yAxis > this.rowsLength - 1) {
          console.log("Invalid Move") 
        } else {
          this._moveHoover(xAxis, yAxis)
        }
        break;
      }
      case 'E': {
        const yAxis = this.hooverCoords.y
        const xAxis = this.hooverCoords.x + 1
        if (xAxis > this.columnsLength - 1) {
          console.log("Invalid Move") 
        } else {
          this._moveHoover(xAxis, yAxis)
        }
        break;
      }
      case 'S': {
        const yAxis = this.hooverCoords.y - 1
        const xAxis = this.hooverCoords.x 
        if (yAxis < 0) {
          console.log("Invalid Move") 
        } else {
          this._moveHoover(xAxis, yAxis)
        }
        break;
      }
      case 'W': {
        const yAxis = this.hooverCoords.y 
        const xAxis = this.hooverCoords.x - 1
        if (xAxis < 0) {
          console.log("Invalid Move") 
        } else {
          this._moveHoover(xAxis, yAxis)
        }
        break;
      }
      default: 
       return "Invalid Move"
    }
  }
}

// Create game instance and utilise instance methods to run data from input.txt
const game = new Game(parseInt(boardDimensions[0]), parseInt(boardDimensions[1]));
game.setHooverPosition(parseInt(startPosition[0]), parseInt(startPosition[1]))
game.addDirtToBoard(dirtCoords)
game.playGame(intructions)

// GAME RESULTS:
console.log(game.hooverCoords.x, game.hooverCoords.y)
console.log(game.dirtRemoved)




