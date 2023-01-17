const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLS = 7;

/* Represents the two player identifiers for the Connect Four game. */
export enum Player {
  ONE = 'ONE',
  TWO = 'TWO',
}

/* Represents the possible values of a cell in the Connect Four board. */
export type CellRange =
  | 0 // empty cell
  | 1 // player one game piece
  | 2; // player two game piece

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

  /**
   * Allows player to reset the game state, and start a brand new game.
   */
  public resetGame(): void {
    this.#initializeGame();
  }

  /**
   * Allows the current player to make a move by providing the column they would like to drop their game piece into.
   */
  public makeMove(col: number): void {
    // TODO
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
}
