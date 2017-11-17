'use strict';

const path = require('path');
const Hexo = require('hexo');
const tests = require('../tests');
const Nightwatch = require('./Nightwatch');


const hexo = new Hexo(path.resolve(__dirname, '../'),{});

const nightwatch = new Nightwatch(tests, hexo);

module.exports = nightwatch.export();
