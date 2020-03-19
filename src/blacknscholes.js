const gauss = require('./gauss.js');

const eulerRateTime = (irate, rtime) => {
	return Math.exp(irate*rtime*-1);
}

const typeFactor = (type) => {
	return type === 'put' ? -1 : 1;
}

const blacknscholes = {
	//d1 term from EDP
	d1Term : (sprice, strike, volatility, irate, rtime) => {
		return (Math.log(sprice / strike) + (irate + Math.pow(volatility,2)/2) * rtime) / (volatility * Math.sqrt(rtime));
	},
	//d2 term from EDP
	d2Term : (d1term, volatility, rtime) => {
		return d1term - volatility * Math.sqrt(rtime);
	},
	//Theoretical derivative price
	price : (sprice, strike, irate, rtime, d1, d2, type) => {
		const tf = typeFactor(type);
		const nd1 = gauss.standardNormalDistribution(d1* tf).toFixed(9);
		const nd2 = gauss.standardNormalDistribution(d2* tf).toFixed(9);

		return (tf * (sprice * nd1)) - (tf * (strike * eulerRateTime(irate, rtime) * nd2));
	},
	//delta greek measure
	delta : (d1term, type) => {
		return gauss.standardNormalDistribution(d1term);
	},
	//rho greek measure
	rho : (strike, irate, rtime, d2term, type) => {
		// from https://financetrain.com/option-greeks-rho/
		// formula is rhoCall = K . t . (e^-r.t) . N(d2)
		const tf = typeFactor(type);

		return strike * rtime * eulerRateTime(irate, rtime) * gauss.standardNormalDistribution(d2term * tf) * tf;
	}	
}

module.exports = blacknscholes;