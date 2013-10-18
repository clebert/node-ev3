/* global setup, suite, test */

'use strict';

var assert = require('assert'),
    constants = require('../lib/device/constants'),
    device = require('../lib/device/device'),
    testUtil = require('./test_util');

suite('ui_device', function () {

    suite('.getButtonState(button:number) => boolean', function () {
        var buffer = new Buffer(6),
            uiDevice;

        setup(function () {
            var index;

            for (index = 0; index < buffer.length; index += 1) {
                buffer[index] = 0;
            }
        });

        device.map = function (name, length) {
            assert.strictEqual(name, '/dev/lms_ui');
            assert.strictEqual(length, 6);

            return buffer;
        };

        uiDevice = testUtil.reloadModule('../lib/device/ui_device');

        [
            'UP', 'ENTER', 'DOWN', 'RIGHT', 'LEFT', 'ESCAPE'
        ].forEach(function (name) {
            var button = constants.BUTTON[name],
                description;

            description = 'should return false when passing BUTTON.' + name;

            test(description, function () {
                assert.strictEqual(uiDevice.getButtonState(button), false);
            });

            description = 'should return true when passing BUTTON.' + name;

            test(description, function () {
                buffer[button] = 1;

                assert.strictEqual(uiDevice.getButtonState(button), true);
            });
        });
    });
});
