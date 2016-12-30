'use strict';

module.exports = chaiExec;

/**
 * Adds the Chai-Exec plug-in to Chai.js
 *
 * @param {object} chai - The ChaiJS module
 * @param {object} utils - ChaiJS utility functions
 */
function chaiExec (chai, utils) {
  require('./exit-code')(chai, utils);
}
