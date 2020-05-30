'use strict';
/**
 * Arquivo: bisection.js
 * Author: Vanderci Curvelo Junior
 * Description: implementation of bisection method to find a root value
 * There is no classical implementation but adapted for b & s implied volatility
 * Data: 28/05/2020
 *
 */
module.exports = (seek_value, a, b, tolerance, number_of_iterations, fn)  =>  {
  // pseudocode from https://en.wikipedia.org/wiki/Bisection_method
  // N ← 1
  // while N ≤ NMAX do // limit iterations to prevent infinite loop
  //     c ← (a + b)/2 // new midpoint
  //     if f(c) = 0 or (b – a)/2 < TOL then // solution found
  //         Output(c)
  //         Stop
  //     end if
  //     N ← N + 1 // increment step counter
  //     if sign(f(c)) = sign(f(a)) then a ← c else b ← c // new interval
  // end while
  //

  let _a = a,
    _b	=	b;

  for (let i = 1; i < number_of_iterations; i++) {
    let c = (_a+_b)/2,
      y = fn(c),
      error = Math.abs(y - seek_value);

    if (error === 0 || error < tolerance || (_b-_a)/2 < tolerance) {
      return c;
    }

    if (y > seek_value) {
      _b = c;
    } else {
      _a = c;
    }
  }
};
