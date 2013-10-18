/* global suite, test */

'use strict';

var assert = require('assert'),
    constants = require('../lib/device/constants');

suite('constants', function () {

    suite('.BUTTON', function () {
        var BUTTON = constants.BUTTON;

        suite('.UP', function () {

            test('should be 0', function () {
                assert.strictEqual(BUTTON.UP, 0);
            });
        });

        suite('.ENTER', function () {

            test('should be 1', function () {
                assert.strictEqual(BUTTON.ENTER, 1);
            });
        });

        suite('.DOWN', function () {

            test('should be 2', function () {
                assert.strictEqual(BUTTON.DOWN, 2);
            });
        });

        suite('.RIGHT', function () {

            test('should be 3', function () {
                assert.strictEqual(BUTTON.RIGHT, 3);
            });
        });

        suite('.LEFT', function () {

            test('should be 4', function () {
                assert.strictEqual(BUTTON.LEFT, 4);
            });
        });

        suite('.ESCAPE', function () {

            test('should be 5', function () {
                assert.strictEqual(BUTTON.ESCAPE, 5);
            });
        });
    });

    suite('.MOTOR_PORT', function () {
        var MOTOR_PORT = constants.MOTOR_PORT;

        suite('.A', function () {

            test('should be 1', function () {
                assert.strictEqual(MOTOR_PORT.A, 1);
            });
        });

        suite('.B', function () {

            test('should be 2', function () {
                assert.strictEqual(MOTOR_PORT.B, 2);
            });
        });

        suite('.C', function () {

            test('should be 4', function () {
                assert.strictEqual(MOTOR_PORT.C, 4);
            });
        });

        suite('.D', function () {

            test('should be 8', function () {
                assert.strictEqual(MOTOR_PORT.D, 8);
            });
        });
    });
});
