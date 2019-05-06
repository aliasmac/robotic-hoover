# robotic-hoover
A simple game to clean a room full of dirt with a handy robotic hoover!

## Functionality 
* The game takes commands from input.txt and feeds it to script.js where the data is parsed to create a 2D game board 
* The purpose of the game is to:
    * add dirt to the 2D grid and then
    * direct the hoover to clean up the dirt  
* The game has been designed according to OOP principles that uses class structure to organise the code 

## How to run program
- Clone this repository and cd robotic-hoover/src 
- run `node script.js`
- The results of the game will be printed to the terminal in the following format:\
`1 3`\
`1`
- Where the first line is the final position of the hoover
- The second line is the number of dirt patches cleaned

### Reference:
- https://gist.github.com/DavidJSimpsonEsq/71dcf396a2303ad5edd08690289d016d
