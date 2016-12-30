'use strict';

// Export Chai-Exec as a Chai.js plug-in
module.exports = exports = require('./assertions');

// Also export the sync and async functions
exports.sync = require('./sync');
exports.async = require('./async');
