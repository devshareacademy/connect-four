export enum Player {
  ONE = 'ONE',
  TWO = 'TWO',
}

export type CellRange = 0 | 1 | 2;

export default class ConnectFour {
  #board: CellRange[][] = [];
  #playersTurn: Player = Player.ONE;
  #isGameOver = false;
  #gameWinner: undefined | Player;

  constructor() {}
}
