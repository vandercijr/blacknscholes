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
	stock_price : 30,
	strike : 35,
	volatility : 0.72,
	interest_rate : 0.03,
	expiration_days : 0.052055
}

describe('TDD for black & scholes operations', () => {
  it('Should calculate the expiration days to an given exercise', () => {
		assert.equal(blacknscholes.expirationDays('2020-05-27', '2020-06-15').toFixed(6), 0.052055);
	});

	it('Should calculate the d1 B&S equation', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);

		assert.equal(d1, -0.846743919);
	});

	it('Should calculate the d2 term B&S equation', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.expiration_days).toFixed(9);

		assert.equal(d2, -1.011015986);
	});

	it('Should calculate the theoretical option price equation for a call', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.price(options.stock_price, options.strike, options.interest_rate, options.expiration_days, d1, d2, 'call').toFixed(2), 0.51);
	});

	it('Should calculate the theoretical option price equation for a put', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.price(options.stock_price, options.strike, options.interest_rate, options.expiration_days, d1, d2, 'put').toFixed(2), 5.45);
	});

	it('Should calculate the option greek delta equation for a call', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.delta(d1, 'call').toFixed(4), 0.1986);
	});

  it('Should calculate the option greek delta equation for a put', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.delta(d1, 'put').toFixed(4), -0.8014);
	});

	it('Should calculate the option greek rho equation for a call', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.rho(options.strike, options.interest_rate, options.expiration_days, d2, 'call').toFixed(6), 0.002838);
	});

  it('Should calculate the option greek rho equation for a put', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.rho(options.strike, options.interest_rate, options.expiration_days, d2, 'put').toFixed(6), -0.015353);
	});

  it('Should calculate the option greek gamma equation', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.gamma(options.stock_price, options.volatility, options.expiration_days, d1).toFixed(6), 0.056563);
	});

  it('Should calculate the option greek vega equation', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.vega(options.stock_price, options.expiration_days, d1).toFixed(6), 0.019080);
	});

  it('Should calculate the option greek theta equation for a call', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);
    const d2 = blacknscholes.d2Term(d1, options.volatility, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.theta(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days, d1, d2, 'call').toFixed(6), -0.036599);
	});

  it('Should calculate the option greek theta equation for a put', () => {
		const d1 = blacknscholes.d1Term(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days).toFixed(9);
    const d2 = blacknscholes.d2Term(d1, options.volatility, options.expiration_days).toFixed(9);

		assert.equal(blacknscholes.theta(options.stock_price, options.strike, options.volatility, options.interest_rate, options.expiration_days, d1, d2, 'put').toFixed(6), -0.033727);
	});
});
