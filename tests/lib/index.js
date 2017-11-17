'use strict';

const path = require('path');

const Hexo = require('hexo');

const hexo = new Hexo(path.resolve(__dirname, '../'),{});

const scenarios = require('../scenarios');
const rootTag = '.dc-page';


/**
 * Dummy utility function to get stepOptions if any
 *
 * @param  {string} property - property nested in globals.stepOptions
 * @param  {client} browser  - nightwatch client object
 * @return {Object}
 */
function getStepOptions (property, browser) {
  if (!browser.globals) {
    return;
  }

  if (!browser.globals.stepOptions) {
    return;
  }

  if (!browser.globals.stepOptions[property]) {
    return;
  }

  return browser.globals.stepOptions[property];
}

const tests = Object
  .keys(scenarios)
  .reduce((acc, curr) => {
    acc[curr] = function(browser, done){
      const stepOptions = getStepOptions(curr, browser) || {};
      stepOptions.rootTag = rootTag;

      scenarios[curr]({browser, done, hexo, stepOptions});
    };

    return acc;

  }, {});

tests.after = function (browser) {
    browser.end();
  };
tests.before = async function(browser, done){
    await hexo.init();
    await hexo.load();
    done();
  };


module.exports = tests;
