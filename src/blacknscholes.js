const gauss = require('./gauss.js');

const eulerRateTime = (irate, rtime) => {
	return Math.exp(irate*rtime*-1);
}

const typeFactor = (type) => {
	return type === 'put' ? -1 : 1;
}

const blacknscholes = {
	//d1 term from EDP
	d1Term : (stock_price, strike, volatility, irate, rtime) => {
		return (Math.log(stock_price / strike) + ((irate + Math.pow(volatility,2) * 0.5) * rtime)) / (volatility * Math.sqrt(rtime));
	},
	//d2 term from EDP
	d2Term : (d1term, volatility, rtime) => {
		return d1term - volatility * Math.sqrt(rtime);
	},
	//Theoretical derivative price
	price : (stock_price, strike, irate, rtime, d1term, d2term, type) => {
		const tf = typeFactor(type);
		const nd1 = gauss.standardNormalDistribution(d1term* tf).toFixed(9);
		const nd2 = gauss.standardNormalDistribution(d2term* tf).toFixed(9);

		return (tf * (stock_price * nd1)) - (tf * (strike * eulerRateTime(irate, rtime) * nd2));
	},
	//delta greek measure
	delta : (d1term, type) => {
		const tf = typeFactor(type);

		return tf * gauss.standardNormalDistribution(tf * d1term);
	},
	//rho greek measure
	rho : (strike, irate, rtime, d2term, type) => {
		// from https://financetrain.com/option-greeks-rho/
		// formula is rhoCall = K . t . (e^-r.t) . N(d2)
		const tf = typeFactor(type);

		return tf * strike * rtime * eulerRateTime(irate, rtime) * gauss.standardNormalDistribution(d2term * tf) * 0.01;
	}
}

module.exports = blacknscholes;
