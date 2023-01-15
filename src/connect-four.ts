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

  constructor() {}

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
}
