/* global suite, test */

'use strict';

var assert = require('assert'),
    device = require('../lib/device/device'),
    testUtil = require('./test_util');

suite('analog_device', function () {
    var bufferSize = 32;

    function getAnalogDevice(buffer) {
        device.map = function map(name, length) {
            assert.strictEqual(name, '/dev/lms_analog');
            assert.strictEqual(length, bufferSize);

            return buffer;
        };

        return testUtil.reloadModule('../lib/device/analog_device');
    }

    suite('.getVoltage() => number', function () {
        [
            {
                buffer: new Buffer([
                    124, 0, 252, 11
                ]),
                voltage: 7.548945498945499
            },
            {
                buffer: new Buffer([
                    36, 1, 220, 13
                ]),
                voltage: 8.73043068043068
            },
            {
                buffer: new Buffer([
                    112, 0, 104, 14
                ]),
                voltage: 9.062321012321013
            }
        ].forEach(function (data) {
            test('should return ' + data.voltage, function () {
                var buffer = testUtil.createBuffer(bufferSize),
                    analogDevice = getAnalogDevice(buffer);

                data.buffer.copy(buffer, 28);

                assert.strictEqual(analogDevice.getVoltage(), data.voltage);
            });
        });
    });
});
