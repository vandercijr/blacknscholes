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
	it('Should calculate the zscore of a random variable', () => {
		assert.equal(blacknscholes.zscore(12, 2, 5), 2);
		assert.equal(blacknscholes.zscore(10, 1, 5), 1.8);
	});

	it('Should calculate the normalization factor for normal distribution formula', () => {
		assert.equal(blacknscholes.normalizationFactor(1).toFixed(8), 0.39894228);
		assert.equal(blacknscholes.normalizationFactor(2).toFixed(8), 0.19947114);
	});

	it('Should calculate the normalization factor for normal distribution formula', () => {
		assert.equal(blacknscholes.spdf(1).toFixed(8), 0.24197072);
	});
	// it('Should calculate the default normal distribution of a given value', () => {
	// 	assert.equal(blacknscholes.normalDistribution(10), 1);
	// 	assert.equal(blacknscholes.normalDistribution(3.5), 1);
	// })
});
