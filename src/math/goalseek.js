'use strict';
/**
 * Arquivo: goalseek.js
 * Author: Vanderci Curvelo Junior
 * Description: implementation of goal seek function
 * Data: 28905/2020
 *
 */
const bissection = require('./bisection');

const goalseek = (seek_value, a, b, tolerance, number_of_iterations, fn)  =>  {
  return bissection(seek_value, a,b, tolerance, number_of_iterations, fn);
};

module.exports = goalseek;
