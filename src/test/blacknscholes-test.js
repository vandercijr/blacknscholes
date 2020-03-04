/**
 * Arquivo: blacknscholes-test.js
 * Author: Vanderci Curvelo Junior
 * Description: test for the file : 'blacknscholes.js'
 * Data: 01/03/2020
 *
 * Documentação: http://chaijs.com/guide/styles/#assert
 *
 */

const chai = require('chai');
const blacknscholes = require('../blacknscholes.js');
const assert = chai.assert;

describe('TDD for black & scholes operations', () => {
	it('Should calculate the d1 B&S equation', () => {
		assert.equal(blacknscholes.d1Term(32,34,0.3,0.0875,0.0822).toFixed(9), -0.578213940);
	});

	it('Should calculate the d2 term B&S equation', () => {
		assert.equal(blacknscholes.d2Term(blacknscholes.d1Term(32,34,0.3,0.0875,0.0822).toFixed(9),0.3,0.0822).toFixed(9), -0.578213940);
	});	
});
