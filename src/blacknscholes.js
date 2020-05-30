'use strict';
/**
 * Arquivo: blacknscholes.js
 * Author: Vanderci Curvelo Junior
 * Description: implementation of the black & scholes formulas to find the theoretical price of a derivative'
 * Data: 18/03/2020
*/
const gauss = require('./math/gauss');
const goalSeek = require('./math/goalseek');

const eulerRateTime = (interest_rate, expiration_days) => {
  return Math.exp(interest_rate*expiration_days*-1);
};

const typeFactor = (type) => {
  return type === 'put' ? -1 : 1;
};

const blacknscholes = {
  //d1 term from EDP
  d1Term : (stock_price, strike, volatility, interest_rate, expiration_days) => {
    return (Math.log(stock_price / strike) + ((interest_rate + Math.pow(volatility,2) * 0.5) * expiration_days)) / (volatility * Math.sqrt(expiration_days));
  },
  //d2 term from EDP
  d2Term : (d1term, volatility, expiration_days) => {
    return d1term - volatility * Math.sqrt(expiration_days);
  },
  //Theoretical derivative price
  price : (stock_price, strike, interest_rate, expiration_days, d1term, d2term, type) => {
    const tf = typeFactor(type);
    const nd1 = gauss.standardNormalDistribution(d1term* tf).toFixed(9);
    const nd2 = gauss.standardNormalDistribution(d2term* tf).toFixed(9);

    return (tf * (stock_price * nd1)) - (tf * (strike * eulerRateTime(interest_rate, expiration_days) * nd2));
  },
  //delta greek measure
  delta : (d1term, type) => {
    const tf = typeFactor(type);

    return tf * gauss.standardNormalDistribution(tf * d1term);
  },
  //rho greek measure
  rho : (strike, interest_rate, expiration_days, d2term, type) => {
    // from https://financetrain.com/option-greeks-rho/
    // formula is rhoCall = K . t . (e^-r.t) . N(d2)
    const tf = typeFactor(type);

    return tf * strike * expiration_days * eulerRateTime(interest_rate, expiration_days) * gauss.standardNormalDistribution(d2term * tf) * 0.01;
  },
  //gamma greek measure
  gamma : (stock_price, volatility, expiration_days, d1term) => {
    // from https://financetrain.com/option-greeks-rho/
    // formula is gamma = N'(d1) /  S . V  . SQRT(t)
    return gauss.spdf(d1term) / (stock_price * volatility * Math.sqrt(expiration_days));
  },
  //vega greek measure
  vega : (stock_price, expiration_days, d1term) => {
    // from https://financetrain.com/option-greeks-rho/
    // formula is vega = S . N'(d1) /  SQRT(t)
    return stock_price * gauss.spdf(d1term) * Math.sqrt(expiration_days) * 0.01;
  },
  //theta greek measure
  theta : (stock_price, strike, volatility, interest_rate, expiration_days, d1term, d2term, type) => {
    // from https://financetrain.com/option-greeks-rho/
    // formula is theta = S . N'(d1) / 2 . SQRT(t) - r.K.e^-r.t .  N(d2)
    const tf = typeFactor(type);

    return (((-1 * stock_price * gauss.spdf(d1term) * volatility) / (2 * Math.sqrt(expiration_days))) - tf * interest_rate * strike * eulerRateTime(interest_rate, expiration_days) * gauss.standardNormalDistribution(d2term * tf)) / 365;
  },
  expirationDays:	(current_date, exercise_date)	=>	{
    const _current_date = new Date(current_date)
      ,_exercise_date = new Date(exercise_date)
      ,one_day	=	1000 * 60 * 60 * 24;

    return (((_exercise_date - _current_date) / one_day).toFixed(0) / 365);
  },
  impliedVolatility:	(stock_price, strike, interest_rate, expiration_days, derivative_price, type)	=>	{

    // let y = fn(stock_price, strike, interest_rate, expiration_days, c, type);
    const fn = (volatility)	=>	{
      let d1 = blacknscholes.d1Term(stock_price, strike, volatility, interest_rate, expiration_days).toFixed(9);
      let d2 = blacknscholes.d2Term(d1, volatility, expiration_days).toFixed(9);

      return blacknscholes.price(stock_price, strike, interest_rate, expiration_days, d1, d2, type);
    };

    let y = goalSeek(derivative_price, 0.01, 5, Math.pow(10, -5), Math.pow(10, 3), fn);

    return y;
  }
};

module.exports = blacknscholes;
