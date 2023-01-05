/**
 * These are utility function for calculating the min/max col/row to check for a winning combination
 * when a new game piece is added to the Connect Four board. When a game piece is added, we need to check
 * up to four possible row/col combinations and these functions are used to help determine those values.
 *
 * Note: we have a limit on being 3 cells away since we only win the game if there are 4 game pieces in a row.
 */

export function min(num: number): number {
  return Math.max(num - 3, 0);
}

export function max(num: number, max: number): number {
  return Math.min(num + 3, max);
}
