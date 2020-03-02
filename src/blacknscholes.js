module.exports = {
	zscore : (x, mu, sigma) => {
    	return (x - mu) / sigma;
	},
	normalizationFactor : (sigma) => {
	    return 1 / (sigma * Math.sqrt(2 * Math.PI));
	}
}
