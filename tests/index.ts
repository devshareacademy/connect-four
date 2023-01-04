import * as uvu from 'uvu';
import * as assert from 'uvu/assert';

import * as CF from '../src';

const suite = uvu.suite('Core');

suite('Should expose a test function', () => {
  assert.type(CF.test, 'function');
});

suite.run();
