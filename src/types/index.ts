export enum Player {
  ONE = 'ONE',
  TWO = 'TWO',
}

export enum ConnectFourError {
  INVALID_MOVE = 'Column is already filled, please provide a different column.',
  INVALID_COLUMN = 'Invalid column specified. Please provide a valid column number.',
  INVALID_MOVE_GAME_IS_OVER = 'Game has already ended, please reset the game.',
}

export type CellRange = 0 | 1 | 2;

export type Coordinate = {
  col: number;
  row: number;
};
