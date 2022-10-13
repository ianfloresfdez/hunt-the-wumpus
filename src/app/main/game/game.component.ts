import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  //declaration of variables
  boardLen: number = 0;
  board: any[][];
  auxBoard: any[][];
  spears: number;
  monsters: number;
  wells: number;
  gold: number;
  consoleMessages: string[];
  finalMessage: string[];
  gameOver: number;
  goldFound: boolean;
  movementSel: string;
  killMessage: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    //check if boardLen is OK and if there are less wells than the boardLen
    //check if boardLen is a number
    if (isNaN(Number(this.route.snapshot.paramMap.get('boardLen')))) {
      this.router.navigate(['/home']);
    } else {
      //check if boardLen between 2 and 10
      if (
        Number(this.route.snapshot.paramMap.get('boardLen')) < 2 ||
        Number(this.route.snapshot.paramMap.get('boardLen')) > 10
      ) {
        this.router.navigate(['/home']);
      } else {
        //check wells are less than boardlen
        if (
          Number(this.route.snapshot.paramMap.get('wells')) >
          Number(this.route.snapshot.paramMap.get('boardLen'))
        ) {
          this.router.navigate(['/home']);
        }
      }
    }

    //filling declarated variables
    this.boardLen = Number(this.route.snapshot.paramMap.get('boardLen'));
    this.board = [];
    this.auxBoard = [];
    this.monsters = 1;
    this.gold = 1;
    this.spears = Number(this.route.snapshot.paramMap.get('spears'));
    this.wells = Number(this.route.snapshot.paramMap.get('wells'));
    this.consoleMessages = [];
    this.finalMessage = [];
    this.movementSel = 'down';
    this.gameOver = 0;
    this.goldFound = false;
    this.killMessage = '';
  }

  ngOnInit(): void {
    //generate board
    this.generateBoard(this.boardLen);
    //fill board
    this.fillBoard();
    //get information of what's next to the player
    this.getInfo();
  }

  //function to generate a board with monsters and wells
  generateBoard(boardLen: number): void {
    try {
      //loop to create empty board game
      for (let x = 0; x < boardLen; x++) {
        this.board.push([]);
        this.auxBoard.push([]);
        for (let y = 0; y < boardLen; y++) {
          this.board[x].push('');
          this.auxBoard[x].push([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  //function to generate a board with monsters and wells
  fillBoard(): void {
    try {
      //aux numbers to know when everything is filled
      var numWells = 0;
      var numMonsters = 0;
      var numGold = 0;
      //assign start position
      this.board[0][0] = '웃';
      this.auxBoard[0][0] = '웃';
      //while start
      while (numWells < this.wells) {
        //filling wells
        let numX = this.randomInt(0, this.board.length - 1);
        let numY = this.randomInt(0, this.board.length - 1);
        //filling wells on random places
        if (this.board[numX][numY] === '') {
          this.board[numX][numY] = 'X';
          numWells++;
        }
      }
      while (numMonsters < this.monsters) {
        //filling monsters because there is only one
        let numX = this.randomInt(0, this.board.length - 1);
        let numY = this.randomInt(0, this.board.length - 1);
        //fill monster on random place
        if (this.board[numX][numY] === '') {
          this.board[numX][numY] = ':P';
          numMonsters++;
        }
      }
      while (numGold < this.gold) {
        //filling gold
        let numX = this.randomInt(0, this.board.length - 1);
        let numY = this.randomInt(0, this.board.length - 1);
        //fill gold on random place
        if (this.board[numX][numY] === '') {
          this.board[numX][numY] = '$';
          numGold++;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  //function to get random number between 2 numbers
  randomInt(min: number, max: number): number {
    try {
      return Math.floor(Math.random() * (max - min + 1) + min);
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  //function to get what's next to the player
  getInfo(): void {
    try {
      this.consoleMessages = [];
      var positions = this.getPlayerPos();
      var x = positions[0];
      var y = positions[1];
      //loop to get what's next to the player
      for (let dx = -1; dx <= 1; ++dx) {
        for (let dy = -1; dy <= 1; ++dy) {
          if (dx != 0 || dy != 0) {
            console.log(dx + x);
            if (
              dx + x > -1 &&
              dx + x < this.boardLen &&
              dy + y > -1 &&
              dy + y < this.boardLen &&
              (dx + x == x || dy + y == y)
            ) {
              //switch to show a message depending what's next to the player
              switch (this.board[dx + x][dy + y]) {
                case ':P':
                  this.consoleMessages.push('Hay un MONSTRUO cerca!');
                  break;
                case 'X':
                  this.consoleMessages.push('Hay un POZO cerca');
                  break;
                case '$':
                  this.consoleMessages.push('Hay ORO cerca');
                  break;
                default:
                  break;
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  //function to selet direction
  selectDirection(where: string) {
    try {
      this.movementSel = where;
    } catch (error) {
      console.error(error);
    }
  }

  //function to move player
  movePlayer(): void {
    try {
      //restart message if we come after smashing a wall
      if (this.finalMessage[0] == 'AUCH, has chocado con un muro!') {
        this.finalMessage = [];
      }
      var positions = this.getPlayerPos();
      var x = positions[0];
      var y = positions[1];
      //checking the direction
      switch (this.movementSel) {
        case 'left':
          if (y > 0) {
            y = y - 1;
          }
          break;
        case 'right':
          if (y < this.boardLen - 1) {
            y = y + 1;
          }
          break;
        case 'up':
          if (x > 0) {
            x = x - 1;
          }
          break;
        case 'down':
          if (x < this.boardLen - 1) {
            x = x + 1;
          }
          break;
        default:
          break;
      }

      //filling final message depending what we find
      switch (this.board[x][y]) {
        case ':P':
          this.finalMessage.push('Te ha comido el monstruo!');
          this.gameOver = 2;
          break;
        case 'X':
          this.finalMessage.push('Has caido en un pozo!');
          this.gameOver = 2;
          break;
        case '$':
          this.finalMessage.push(
            'Has encontrado el lingote de oro, ya puedes volver a la salida!'
          );
          this.goldFound = true;
          break;
        default:
          break;
      }

      //smashes to a wall
      if (this.board[positions[0]][positions[1]] == this.board[x][y]) {
        this.finalMessage.push('AUCH, has chocado con un muro!');
      }

      //change player position
      this.board[positions[0]][positions[1]] = '';
      this.board[x][y] = '웃';
      this.auxBoard[positions[0]][positions[1]] = '';
      this.auxBoard[x][y] = '웃';
      this.getInfo();

      //it has found the gold and is back to the entry
      if (x == 0 && y == 0 && this.goldFound == true) {
        this.gameOver = 1;
      }
    } catch (error) {
      console.error(error);
    }
  }

  //function to get where the player is
  getPlayerPos(): number[] | any {
    try {
      var x = 0;
      var y = 0;
      //getting x and y pos of the player
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          if (this.board[i][j] == '웃') {
            x = i;
            y = j;
          }
        }
      }
      //return the positions
      return [x, y];
    } catch (error) {
      console.error(error);
    }
  }

  //restart game
  resetGame() {
    //navigate to beggining
    try {
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
    }
  }

  //function to throw a spear
  throwSpear(): void {
    try {
      var positions = this.getPlayerPos();
      var x = positions[0];
      var y = positions[1];
      var aux = 1;
      //watch each direction and seeing the limit of array before changing values
      switch (this.movementSel) {
        case 'left':
          if (y != 0) {
            while (y >= 0) {
              if (this.board[x][y] == ':P') {
                this.board[x][y] = '';
                this.killMessage = 'Has matado el monstruo.';
              }
              y -= aux;
            }
          }
          break;
        case 'right':
          if (y != this.boardLen - 1) {
            console.log(y);
            console.log(this.boardLen - 1);
            while (y <= this.boardLen - 1) {
              console.log(this.board[x][y]);
              if (this.board[x][y] == ':P') {
                this.board[x][y] = '';
                this.killMessage = 'Has matado el monstruo.';
              }
              y = y + aux;
            }
          }
          break;
        case 'up':
          if (x != 0) {
            while (x >= 0) {
              if (this.board[x][y] == ':P') {
                this.board[x][y] = '';
                this.killMessage = 'Has matado el monstruo.';
              }
              x -= aux;
            }
          }
          break;
        case 'down':
          if (x != this.boardLen - 1) {
            while (x <= this.boardLen - 1) {
              if (this.board[x][y] == ':P') {
                this.board[x][y] = '';
                this.killMessage = 'Has matado el monstruo!!!';
              }
              x += aux;
            }
          }
          break;
      }
      //update information because the monster may be dead
      this.getInfo();
      //less 1 spear
      this.spears = this.spears - 1;
    } catch (error) {
      console.error(error);
    }
  }
}
