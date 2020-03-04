const blacknscholes = {
	d1Term : (sprice, strike, volatility, irate, rtime) => {
		return (Math.log(sprice / strike) + (irate + Math.pow(volatility,2)/2) * rtime) / (volatility * Math.sqrt(rtime));
	},
	d2Term : (d1term, volatility, rtime) => {
		return d1term - volatility * Math.sqrt(rtime);
	}	
}

module.exports = blacknscholes;