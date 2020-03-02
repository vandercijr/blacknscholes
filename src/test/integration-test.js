/**
 * Arquivo: integration-test.js
 * Author: Vanderci Curvelo Junior
 * Description: test for the file : 'integration.js'
 * Data: 02/03/2020
 *
 * Documentação: http://chaijs.com/guide/styles/#assert
 *
 */

const chai = require('chai');
const integration = require('../integration.js');
const assert = chai.assert;

describe('TDD for integration computational methods', () => {
	it('Should calculate the integral of a function', () => {
		assert.equal(integration.trapezoid((x) => { return Math.pow(x, 2) }, 0, 3, Math.pow(10, 6)).toFixed(8), 9.00000000);
	});
});
