const integration = require('./integration.js');

const gauss = {
	zscore : (x, mu, sigma) => {
    	return (x - mu) / sigma;
	},
	normalizationFactor : (sigma) => {
	    return 1 / (sigma * Math.sqrt(2 * Math.PI));
	},
	spdf : (z) => {
		return gauss.normalizationFactor(1) * Math.exp(Math.pow(gauss.zscore(z, 0, 1),2) * -0.5);
	},
	standardNormalDistribution : (z) => {
		return integration.trapezoid(gauss.spdf, -50, z, Math.pow(10, 6));
	}
}

module.exports = gauss