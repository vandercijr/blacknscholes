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
const options = {
	stock_price : 38.65,
	strike : 39.55,
	volatility : 0.5157,
	irate : 0.0425,
	rtime : 0.087671,
}

describe('TDD for black & scholes operations', () => {
	it('Should calculate the d1 B&S equation', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);

		assert.equal(d1, -0.050001632);
	});

	it('Should calculate the d2 term B&S equation', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.rtime).toFixed(9);

		assert.equal(d2, -0.202696736);
	});

	it('Should calculate the theoretical option price equation for a call', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.rtime).toFixed(9);

		assert.equal(blacknscholes.price(options.stock_price, options.strike, options.irate, options.rtime, d1, d2, 'call').toFixed(2), 2.02);
	});

	it('Should calculate the theoretical option price equation for a put', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.rtime).toFixed(9);

		assert.equal(blacknscholes.price(options.stock_price, options.strike, options.irate, options.rtime, d1, d2, 'put').toFixed(2), 2.77);
	});

	it('Should calculate the option greek delta equation for a call', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);

		assert.equal(blacknscholes.delta(d1, 'call').toFixed(4), 0.4801);
	});

  it('Should calculate the option greek delta equation for a put', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);

		assert.equal(blacknscholes.delta(d1, 'put').toFixed(4), -0.5199);
	});

	it('Should calculate the option greek rho equation for a call', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.rtime).toFixed(9);

		assert.equal(blacknscholes.rho(options.strike, options.irate, options.rtime, d2, 'call').toFixed(6), 0.014498);
	});

  it('Should calculate the option greek rho equation for a put', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.rtime).toFixed(9);

		assert.equal(blacknscholes.rho(options.strike, options.irate, options.rtime, d2, 'put').toFixed(6), -0.020047);
	});

  it('Should calculate the option greek gamma equation', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);

		assert.equal(blacknscholes.gamma(options.stock_price, options.volatility, options.rtime, d1).toFixed(6), 0.067514);
	});
});
