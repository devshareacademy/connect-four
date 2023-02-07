import { ConnectFourError, Player, CellRange, Coordinate } from './types';
import { min, max } from './utils';

const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLS = 7;

/**
 * Represents the game of Connect Four, where players attempt to get four checkers in a row -
 * horizontally, vertically, or diagonally. The first player to do so wins.
 */
export default class ConnectFour {
  /* an internal representation of the Connect Four Board */
  #board: CellRange[][] = [];
  /* used for tracking for which player will place the next game piece */
  #playersTurn: Player = Player.ONE;
  /* used for tracking for if the game is over, either from the board being filled or a player getting a Connect Four */
  #isGameOver = false;
  /* used for tracking if a player wins the game */
  #gameWinner: undefined | Player;
  /* used for tracking what cells make up a winning Connect Four combination */
  #winningCells: Coordinate[] = [];

  constructor() {
    this.#initializeGame();
  }

  get board(): CellRange[][] {
    return JSON.parse(JSON.stringify(this.#board)) as CellRange[][];
  }

  get playersTurn(): Player {
    return this.#playersTurn;
  }

  get isGameOver(): boolean {
    return this.#isGameOver;
  }

  get gameWinner(): undefined | Player {
    return this.#gameWinner;
  }

  get winningCells(): Coordinate[] {
    return JSON.parse(JSON.stringify(this.#winningCells)) as Coordinate[];
  }

  /**
   * Allows player to reset the game state, and start a brand new game.
   */
  public resetGame(): void {
    this.#initializeGame();
  }

  /**
   * Allows the current player to make a move by providing the column they would like to drop their game piece into.
   */
  public makeMove(col: number): Coordinate {
    // check for validate board space
    if (col < 0 || col > NUMBER_OF_COLS) {
      throw new Error(ConnectFourError.INVALID_COLUMN);
    }

    // validate that the game is not already done
    if (this.#isGameOver) {
      throw new Error(ConnectFourError.INVALID_MOVE_GAME_IS_OVER);
    }

    // validate that the space is not already taken
    if (this.board[0][col] !== 0) {
      throw new Error(ConnectFourError.INVALID_MOVE);
    }

    // update the state of the board to include the players selected space
    let row = 0;
    for (let i = NUMBER_OF_ROWS - 1; i >= 0; i -= 1) {
      if (this.#board[i][col] === 0) {
        if (this.#playersTurn === Player.ONE) {
          this.#board[i][col] = 1;
        } else {
          this.#board[i][col] = 2;
        }
        row = i;
        break;
      }
    }

    // check if the game is finished
    this.#checkForGameEnd(row, col);

    const coordinate: Coordinate = {
      col,
      row,
    };
    if (this.#isGameOver) return coordinate;

    // update the current players turn
    if (this.#playersTurn === Player.ONE) {
      this.#playersTurn = Player.TWO;
    } else {
      this.#playersTurn = Player.ONE;
    }
    return coordinate;
  }

  /**
   * Initializes the internal 2D array that represents the Connect Four board with Zeros, which represent empty spaces.
   */
  #initializeGrid(): void {
    // reset grid back to an empty state
    this.#board = [];

    // populate the rows and cols for the grid
    for (let i = 0; i < NUMBER_OF_ROWS; i += 1) {
      const row: CellRange[] = [];
      for (let j = 0; j < NUMBER_OF_COLS; j += 1) {
        row.push(0);
      }
      this.#board.push(row);
    }
  }

  /**
   * Initializes the internal game state back to the a fresh instance of a Connect Four game, where the board is empty
   * and we are waiting for the first player to make a move.
   */
  #initializeGame(): void {
    this.#initializeGrid();
    this.#isGameOver = false;
    this.#gameWinner = undefined;
    this.#playersTurn = Player.ONE;
    this.#winningCells = [];
  }

  /**
   * Checks if the last played game piece resulted in a player winning the game by getting four in a row,
   * either in a column, row, or diagonal. If after the last piece is placed and there are no remaining game
   * spots left, the game ends in a draw and the game is considered over.
   */
  #checkForGameEnd(row: number, col: number): void {
    const minCol = min(col);
    const maxCol = max(col, NUMBER_OF_COLS - 1);
    const maxRow = max(row, NUMBER_OF_ROWS - 1);

    // see if a player won based off of last piece that placed
    const didPlayerWin =
      this.#isHorizontalWin(row, minCol, maxCol) ||
      this.#isVerticalWin(row, col) ||
      this.#isForwardSlashWin(row, col, minCol, maxRow) ||
      this.#isBackwardSlashWin(row, col, maxCol, maxRow);

    const anyOpenSpots = this.#board[0].some((cell) => {
      return cell === 0;
    });

    if (!anyOpenSpots || didPlayerWin) {
      this.#isGameOver = true;
    }
  }

  /**
   * Checks to see if the last played game piece resulted in four in a row in the provided row.
   * Checks the possible winning combinations for the given row based on where the game piece was played.
   *
   * Example:
   * If the piece was played in column 2, we would need to check the following combinations for a win
   * since column 2 is included in these combinations for a row.
   *  - [0,1,2,3]
   *  - [1,2,3,4]
   *  - [2,3,4,5]
   */
  #isHorizontalWin(lastPiecePlayedRow: number, minCol: number, maxCol: number): boolean {
    const row = lastPiecePlayedRow;
    for (let col = minCol; col <= maxCol; col++) {
      const cells = [
        this.#board[row][col],
        this.#board[row][col + 1],
        this.#board[row][col + 2],
        this.#board[row][col + 3],
      ];
      const isWin = this.#doAllCellsMatch(cells, this.#board[row][col]);
      if (isWin) {
        this.#winningCells = [
          { col, row },
          { col: col + 1, row },
          { col: col + 2, row },
          { col: col + 3, row },
        ];
        return true;
      }
    }
    return false;
  }

  /**
   * Checks to see if the last played game piece resulted in four in a row in the provided column.
   * When we check for a win in column, we only need to check the current cell and the three cells
   * below that one since there will be no game pieces above the current piece. This means there
   * could only be one possible winning combination for the column.
   *
   * We also only need to check for a win if this is at least the fourth game piece added to this column,
   * since four pieces are required for a win.
   */
  #isVerticalWin(row: number, col: number): boolean {
    if (row > 2) return false;
    const cells = [
      this.#board[row][col],
      this.#board[row + 1][col],
      this.#board[row + 2][col],
      this.#board[row + 3][col],
    ];
    const isWin = this.#doAllCellsMatch(cells, this.#board[row][col]);
    if (isWin) {
      this.#winningCells = [
        { col, row },
        { col, row: row + 1 },
        { col, row: row + 2 },
        { col, row: row + 3 },
      ];
    }
    return isWin;
  }

  /**
   * Checks to see if the last played game piece resulted in four in a row in a forward diagonal.
   * Checks the possible winning combinations for the given row and column based on where the game piece was played.
   *
   * Example:
   * If the piece was played in column 3 row 3, we would need to check the following combinations for a win
   * since column 3 row 3 is included in each combination:
   *  - [{col: 1, row: 5}, {col: 2, row: 4}, {col: 3, row: 3}, {col: 4, row: 2}]
   *  - [{col: 2, row: 4}, {col: 3, row: 3}, {col: 4, row: 2}, {col: 5, row: 1}]
   *  - [{col: 3, row: 4}, {col: 4, row: 2}, {col: 5, row: 1}, {col: 6, row: 0}]
   */
  #isForwardSlashWin(row: number, col: number, minCol: number, maxRow: number): boolean {
    //  need to determine a new max and min based on the diagonal
    let maxDiagonalSpaces = Math.min(col - minCol, maxRow - row);
    while (maxDiagonalSpaces >= 0) {
      const tempCol = col - maxDiagonalSpaces;
      const tempRow = row + maxDiagonalSpaces;
      if (tempRow > 2 && tempCol <= 3) {
        const cells = [
          this.#board[tempRow][tempCol],
          this.#board[tempRow - 1][tempCol + 1],
          this.#board[tempRow - 2][tempCol + 2],
          this.#board[tempRow - 3][tempCol + 3],
        ];
        const isWin = this.#doAllCellsMatch(cells, this.#board[row][col]);
        if (isWin) {
          this.#winningCells = [
            { col: tempCol, row: tempRow },
            { col: tempCol + 1, row: tempRow - 1 },
            { col: tempCol + 2, row: tempRow - 2 },
            { col: tempCol + 3, row: tempRow - 3 },
          ];
          return true;
        }
      }
      maxDiagonalSpaces--;
    }
    return false;
  }

  /**
   * Checks to see if the last played game piece resulted in four in a row in a backward diagonal.
   * Checks the possible winning combinations for the given row and column based on where the game piece was played.
   *
   * Example:
   * If the piece was played in column 3 row 3, we would need to check the following combinations for a win
   * since column 3 row 3 is included in each combination:
   *  - [{col: 5, row: 5}, {col: 4, row: 4}, {col: 3, row: 3}, {col: 2, row: 2}]
   *  - [{col: 4, row: 4}, {col: 3, row: 3}, {col: 2, row: 2}, {col: 1, row: 1}]
   *  - [{col: 3, row: 3}, {col: 2, row: 2}, {col: 1, row: 1}, {col: 0, row: 0}]
   */
  #isBackwardSlashWin(row: number, col: number, maxCol: number, maxRow: number): boolean {
    //  need to determine a new max and min based on the diagonal
    let maxDiagonalSpaces = Math.min(maxCol - col, maxRow - row);
    while (maxDiagonalSpaces >= 0) {
      const tempCol = col + maxDiagonalSpaces;
      const tempRow = row + maxDiagonalSpaces;

      if (tempRow > 2 && tempCol >= 3) {
        const cells = [
          this.#board[tempRow][tempCol],
          this.#board[tempRow - 1][tempCol - 1],
          this.#board[tempRow - 2][tempCol - 2],
          this.#board[tempRow - 3][tempCol - 3],
        ];
        const isWin = this.#doAllCellsMatch(cells, this.#board[row][col]);
        if (isWin) {
          this.#winningCells = [
            { col: tempCol, row: tempRow },
            { col: tempCol - 1, row: tempRow - 1 },
            { col: tempCol - 2, row: tempRow - 2 },
            { col: tempCol - 3, row: tempRow - 3 },
          ];
          return true;
        }
      }
      maxDiagonalSpaces--;
    }
    return false;
  }

  /**
   * Checks to see if all cells in the provided array match the provided value. If so,
   * update the internal game state to have the appropriate winner value.
   */
  #doAllCellsMatch(cells: number[], value: number): boolean {
    const isWin = cells.every((cell) => {
      return cell === value && cell !== 0;
    });
    if (isWin) {
      if (value === 1) {
        this.#gameWinner = Player.ONE;
      } else {
        this.#gameWinner = Player.TWO;
      }
      return true;
    }
    return false;
  }
}
