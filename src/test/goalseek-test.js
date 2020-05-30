/**
 * Arquivo: goalseek-test.js
 * Author: Vanderci Curvelo Junior
 * Description: test for the file : 'goalseek.js'
 * Data: 30/05/2020
 *
 * Documentação: http://chaijs.com/guide/styles/#assert
 *
 */

const chai = require('chai');
const goalseek = require('../math/goalseek');
const assert = chai.assert;

describe('TDD for goalseek method', () => {
  it('Should find the root of a function', () => {
    assert.equal(goalseek(4, 0, 10, 0.00001, 200, (x) => { return x * x;}).toFixed(2), 2.00);
  });
});
