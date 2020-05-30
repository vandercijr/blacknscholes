'use strict';
/**
 * Arquivo: integration.js
 * Author: Vanderci Curvelo Junior
 * Description: implementation of a trapezoid integration method'
 * Data: 18/03/2020
*/
const integration = {
  trapezoid : (f, a, b, n) => {
    let sum = 0
      ,deltax = (b-a) / n
      ,fafb = (f(a)+f(b))/2;

    for (let k = 1;k < n;k++) {
      sum += f(a + k*deltax);
    }

    return deltax * (fafb + sum);
  }
};

module.exports = integration;
