const gauss = {
	zscore : (x, mu, sigma) => {
    	return (x - mu) / sigma;
	},
	normalizationFactor : (sigma) => {
	    return 1 / (sigma * Math.sqrt(2 * Math.PI));
	},
	spdf : (z) => {
		return gauss.normalizationFactor(1) * Math.exp(Math.pow(gauss.zscore(z, 0, 1),2) * -0.5);
	}
}

module.exports = gauss