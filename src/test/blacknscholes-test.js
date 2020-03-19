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
	sprice : 46.7,
	strike : 47.8,
	volatility : 0.5157,
	irate : 0.0425,
	rtime : 0.03,
}

describe('TDD for black & scholes operations', () => {
	it('Should calculate the d1 B&S equation', () => {
		// options.sprice = 32;
		// options.strike = 34;
		// options.volatility = 0.3;
		// options.irate = 0.0875;
		// options.rtime = 0.0822;

		const d1 = blacknscholes.d1Term(options.sprice, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);

		assert.equal(d1, -0.578213940);
	});

	it('Should calculate the d2 term B&S equation', () => {
		// options.sprice = 32;
		// options.strike = 34;
		// options.volatility = 0.3;
		// options.irate = 0.0875;
		// options.rtime = 0.0822;

		const d1 = blacknscholes.d1Term(options.sprice, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.rtime).toFixed(9);

		assert.equal(d2, -0.664225567);
	});	

	it('Should calculate the theoretical option price equation for a call', () => {
		// options.sprice = 32;
		// options.strike = 34;
		// options.volatility = 0.3;
		// options.irate = 0.0875;
		// options.rtime = 0.0822;

		const d1 = blacknscholes.d1Term(options.sprice, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.rtime).toFixed(9);

		assert.equal(blacknscholes.price(options.sprice, options.strike, options.irate, options.rtime, d1, d2, 'call').toFixed(2), 0.46);
	});	

	it('Should calculate the theoretical option price equation for a put', () => {
		// options.sprice = 32;
		// options.strike = 34;
		// options.volatility = 0.3;
		// options.irate = 0.0875;
		// options.rtime = 0.0822;

		const d1 = blacknscholes.d1Term(options.sprice, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.rtime).toFixed(9);

		assert.equal(blacknscholes.price(options.sprice, options.strike, options.irate, options.rtime, d1, d2, 'put').toFixed(2), 2.22);
	});

	it('Should calculate the option greek delta equation for a call', () => {
		// options.sprice = 14.06;
		// options.strike = 14;
		// options.volatility = 0.2;
		// options.irate = 0.1325;
		// options.rtime = 0.03;

		const d1 = blacknscholes.d1Term(options.sprice, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);

		assert.equal(blacknscholes.delta(d1, 'call').toFixed(4), 0.6008);
	});

	it('Should calculate the option greek rho equation for a call', () => {
		// options.sprice = 25;
		// options.strike = 25;
		// options.volatility = 0.2;
		// options.irate = 0.10;
		// options.rtime = 0.25;

		const d1 = blacknscholes.d1Term(options.sprice, options.strike, options.volatility, options.irate, options.rtime).toFixed(9);
		const d2 = blacknscholes.d2Term(d1, options.volatility, options.rtime).toFixed(9);

		assert.equal(blacknscholes.rho(options.strike, options.irate, options.rtime, d2, 'call').toFixed(4), 0.6008);
	});		
});
