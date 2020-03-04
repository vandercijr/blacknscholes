/**
 * Arquivo: gauss-test.js
 * Author: Vanderci Curvelo Junior
 * Description: test for the file : 'gauss.js'
 * Data: 01/03/2020
 *
 * Documentação: http://chaijs.com/guide/styles/#assert
 *
 */

const chai = require('chai');
const integration = require('../integration.js');
const gauss = require('../gauss.js');
const assert = chai.assert;

describe('TDD for normal distribution operations', () => {
	it('Should calculate the zscore of a random variable', () => {
		assert.equal(gauss.zscore(12, 2, 5), 2);
		assert.equal(gauss.zscore(10, 1, 5), 1.8);
	});

	it('Should calculate the normalization factor for normal distribution formula', () => {
		assert.equal(gauss.normalizationFactor(1).toFixed(8), 0.39894228);
		assert.equal(gauss.normalizationFactor(2).toFixed(8), 0.19947114);
	});

	it('Should calculate the standard probability density function', () => {
		assert.equal(gauss.spdf(1).toFixed(8), 0.24197072);
	});

	it('Should calculate the cumulative standard normal distribution returning a value from z table', () => {
		assert.equal(integration.trapezoid(gauss.spdf, -50, 1, Math.pow(10, 6)).toFixed(9), 0.841344746);
	});
});
