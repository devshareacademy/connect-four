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

/* Connect Four - Players Place Game Pieces Tests */
function setupPlaceGamePieceTests(): void {
  const connectFourPlayersInputSuite = uvu.suite('Connect Four - Players Place Game Pieces');

  connectFourPlayersInputSuite.before.each(() => {
    connectFour = new ConnectFour();
  });

  connectFourPlayersInputSuite('should return the coordinate of the cell where the game piece was placed', () => {
    const makeMoveResponse = connectFour.makeMove(4);
    assert.equal(makeMoveResponse, {
      col: 4,
      row: 5,
    });
  });

  connectFourPlayersInputSuite('should allow first player to place a game piece and update the game state', () => {
    connectFour.makeMove(0);

    const currentPlayersTurn = connectFour.playersTurn;
    assert.type(currentPlayersTurn, 'string');
    assert.equal(currentPlayersTurn, Player.TWO);

    const isGameOver = connectFour.isGameOver;
    assert.type(isGameOver, 'boolean');
    assert.equal(isGameOver, false);

    const winner = connectFour.gameWinner;
    assert.type(winner, 'undefined');
    assert.equal(winner, undefined);

    const boardState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
    ];
    assert.equal(boardState, connectFour.board);
  });

  connectFourPlayersInputSuite('should allow second player to place a game piece and update the game state', () => {
    connectFour.makeMove(0);
    connectFour.makeMove(0);

    const currentPlayersTurn = connectFour.playersTurn;
    assert.type(currentPlayersTurn, 'string');
    assert.equal(currentPlayersTurn, Player.ONE);

    const isGameOver = connectFour.isGameOver;
    assert.type(isGameOver, 'boolean');
    assert.equal(isGameOver, false);

    const winner = connectFour.gameWinner;
    assert.type(winner, 'undefined');
    assert.equal(winner, undefined);

    const boardState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
    ];
    assert.equal(boardState, connectFour.board);
  });

  connectFourPlayersInputSuite(
    'should throw an error if an invalid column is provided and not modify the game state',
    () => {
      assert.throws(() => connectFour.makeMove(-1), /Invalid column specified/);

      const currentPlayersTurn = connectFour.playersTurn;
      assert.type(currentPlayersTurn, 'string');
      assert.equal(currentPlayersTurn, Player.ONE);

      const isGameOver = connectFour.isGameOver;
      assert.type(isGameOver, 'boolean');
      assert.equal(isGameOver, false);

      const winner = connectFour.gameWinner;
      assert.type(winner, 'undefined');
      assert.equal(winner, undefined);

      const boardState = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      assert.equal(boardState, connectFour.board);
    },
  );

  connectFourPlayersInputSuite(
    'should throw an error if a column is already filled and not modify the game state',
    () => {
      connectFour.makeMove(0);
      connectFour.makeMove(0);
      connectFour.makeMove(0);
      connectFour.makeMove(0);
      connectFour.makeMove(0);
      connectFour.makeMove(0);

      assert.throws(() => connectFour.makeMove(0), /Column is already filled/);

      const currentPlayersTurn = connectFour.playersTurn;
      assert.type(currentPlayersTurn, 'string');
      assert.equal(currentPlayersTurn, Player.ONE);

      const isGameOver = connectFour.isGameOver;
      assert.type(isGameOver, 'boolean');
      assert.equal(isGameOver, false);

      const winner = connectFour.gameWinner;
      assert.type(winner, 'undefined');
      assert.equal(winner, undefined);

      const boardState = [
        [2, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
      ];
      assert.equal(boardState, connectFour.board);
    },
  );

  connectFourPlayersInputSuite.run();
}

setupInitializationTests();
setupResetGameTests();
setupPlaceGamePieceTests();
