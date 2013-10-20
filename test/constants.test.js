/* global suite, test */

'use strict';

var assert = require('assert'),
    constants = require('../lib/device/constants');

suite('constants', function () {

    suite('.BUTTON', function () {
        var BUTTON = constants.BUTTON,
            offsetByKey;

        offsetByKey = {
            UP: 0,
            ENTER: 1,
            DOWN: 2,
            RIGHT: 3,
            LEFT: 4,
            ESCAPE: 5
        };

        Object.keys(offsetByKey).forEach(function (key) {
            suite('.' + key, function () {
                test('should be ' + offsetByKey[key], function () {
                    assert.strictEqual(BUTTON[key], offsetByKey[key]);
                });
            });
        });
    });

    suite('.MOTOR_PORT', function () {
        var MOTOR_PORT = constants.MOTOR_PORT,
            offsetByKey;

        offsetByKey = {
            A: 1,
            B: 2,
            C: 4,
            D: 8
        };

        Object.keys(offsetByKey).forEach(function (key) {
            suite('.' + key, function () {
                test('should be ' + offsetByKey[key], function () {
                    assert.strictEqual(MOTOR_PORT[key], offsetByKey[key]);
                });
            });
        });
    });
});
