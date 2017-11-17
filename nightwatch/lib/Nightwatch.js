'use strict';

/**
 *
 * tests: Key value pair of test name and function.
 *
 */

class Nightwatch {
  constructor(tests, ctx){
    this.tests = tests;
    this.ctx = ctx;
  }

  export(){
    return Object
    .keys(this.tests)
    .reduce((acc, curr) => {
      acc[curr] = (browser, done) =>{
        this.tests[curr](browser, done, this.ctx);
      };

      return acc;

    }, {})
  }
}
module.exports = Nightwatch;
