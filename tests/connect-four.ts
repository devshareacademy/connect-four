import * as uvu from 'uvu';
import * as assert from 'uvu/assert';
import { ConnectFour } from '../src';

let connectFour: ConnectFour;

/* Connect Four - Game Initialization Tests */
function setupInitializationTests(): void {
  const connectFourInitializationSuite = uvu.suite('Connect Four - Initialization');

  connectFourInitializationSuite.before.each(() => {
    connectFour = new ConnectFour();
  });

  connectFourInitializationSuite('should be an instance of the ConnectFour class', () => {
    assert.instance(connectFour, ConnectFour);
  });

  connectFourInitializationSuite.run();
}

setupInitializationTests();
