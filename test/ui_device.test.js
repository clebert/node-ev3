/* global suite, test */

'use strict';

var assert = require('assert'),
    constants = require('../lib/device/constants'),
    device = require('../lib/device/device'),
    testUtil = require('./test_util');

suite('ui_device', function () {
    var bufferSize = 6;

    function getUIDevice(buffer) {
        device.map = function map(name, length) {
            assert.strictEqual(name, '/dev/lms_ui');
            assert.strictEqual(length, bufferSize);

            return buffer;
        };

        return testUtil.reloadModule('../lib/device/ui_device');
    }

    suite('.getButtonState(button:number) => boolean', function () {
        [
            'UP', 'ENTER', 'DOWN', 'RIGHT', 'LEFT', 'ESCAPE'
        ].forEach(function (key) {
            var button = constants.BUTTON[key],
                description;

            description = 'should return false when passing BUTTON.' + key;

            test(description, function () {
                var buffer = testUtil.createBuffer(bufferSize),
                    uiDevice = getUIDevice(buffer);

                assert.strictEqual(uiDevice.getButtonState(button), false);
            });

            description = 'should return true when passing BUTTON.' + key;

            test(description, function () {
                var buffer = testUtil.createBuffer(bufferSize),
                    uiDevice = getUIDevice(buffer);

                buffer[button] = 1;

                assert.strictEqual(uiDevice.getButtonState(button), true);
            });
        });
    });
});
