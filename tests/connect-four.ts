import * as uvu from 'uvu';
import * as assert from 'uvu/assert';
import { ConnectFour } from '../src';
import { Player } from '../src/connect-four';

let connectFour: ConnectFour;

/* Connect Four - Game Initialization Tests */
function setupInitializationTests(): void {
  const connectFourInitializationSuite = uvu.suite('Connect Four - Initialization');

  connectFourInitializationSuite.before.each(() => {
    connectFour = new ConnectFour();
  });

  connectFourInitializationSuite('should initialize the game state with an empty board', () => {
    // check that the board is initialized with empty values
    const isBoardEmpty = connectFour.board.every((row) => row.every((cell) => cell === 0));
    assert.equal(isBoardEmpty, true);
  });

  connectFourInitializationSuite('should initialize the game with no winner', () => {
    const winner = connectFour.gameWinner;
    assert.type(winner, 'undefined');
    assert.equal(winner, undefined);
  });

  connectFourInitializationSuite('should initialize the game and the game should not be over', () => {
    const isGameOver = connectFour.isGameOver;
    assert.type(isGameOver, 'boolean');
    assert.equal(isGameOver, false);
  });

  connectFourInitializationSuite('should initialize the game and wait for the first players input', () => {
    const currentPlayersTurn = connectFour.playersTurn;
    assert.type(currentPlayersTurn, 'string');
    assert.equal(currentPlayersTurn, Player.ONE);
  });

  connectFourInitializationSuite.run();
}

/* Connect Four - Reset Game Tests */
function setupResetGameTests(): void {
  const connectFourResetGameSuite = uvu.suite('Connect Four - Reset Game');

  connectFourResetGameSuite.before.each(() => {
    connectFour = new ConnectFour();
    connectFour.makeMove(0);
    connectFour.resetGame();
  });

  connectFourResetGameSuite('should reset the game state with an empty board', () => {
    // check that the board is initialized with empty values
    const isBoardEmpty = connectFour.board.every((row) => row.every((cell) => cell === 0));
    assert.equal(isBoardEmpty, true);
  });

  connectFourResetGameSuite('should reset the game state with no winner', () => {
    const winner = connectFour.gameWinner;
    assert.type(winner, 'undefined');
    assert.equal(winner, undefined);
  });

  connectFourResetGameSuite('should reset the game state and the game should not be over', () => {
    const isGameOver = connectFour.isGameOver;
    assert.type(isGameOver, 'boolean');
    assert.equal(isGameOver, false);
  });

  connectFourResetGameSuite('should reset the game state and wait for the first players input', () => {
    const currentPlayersTurn = connectFour.playersTurn;
    assert.type(currentPlayersTurn, 'string');
    assert.equal(currentPlayersTurn, Player.ONE);
  });

  connectFourResetGameSuite.run();
}

setupInitializationTests();
setupResetGameTests();
