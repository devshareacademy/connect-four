import * as uvu from 'uvu';
import * as assert from 'uvu/assert';
import * as Utils from '../src/utils';
import { ConnectFourGameState } from '../src/data';

function setupCheckForGameEndTests(): void {
  const checkForGameEndSuite = uvu.suite('Utils - checkForGameEnd');

  checkForGameEndSuite('should not detect game win', () => {
    const gameState = new ConnectFourGameState();
    gameState.board = [
      0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2,
      2, 1, 1, 1,
    ];
    Utils.checkForGameEnd(gameState, 3, 6);
    assert.equal(gameState.isGameOver, false);
    assert.equal(gameState.winningCells, []);
  });

  checkForGameEndSuite.run();
}

setupCheckForGameEndTests();
