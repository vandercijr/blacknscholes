const gauss = require('./gauss.js');

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
		let type_factor = 1;

		if (type === 'put') {
			type_factor = -1;
		}

		const nd1 = gauss.standardNormalDistribution(d1* type_factor).toFixed(9);
		const nd2 = gauss.standardNormalDistribution(d2* type_factor).toFixed(9);

		return (type_factor * (sprice * nd1)) - (type_factor * (strike * Math.exp(irate*rtime*-1) * nd2));
	}		
}

module.exports = blacknscholes;