/* global suite, test */

'use strict';

var assert = require('assert'),
    constants = require('../lib/device/constants'),
    device = require('../lib/device/device'),
    testUtil = require('./test_util');

suite('motor_device', function () {
    var bufferSize = 48;

    function getMotorDevice(buffer) {
        device.map = function map(name, length) {
            assert.strictEqual(name, '/dev/lms_motor');
            assert.strictEqual(length, bufferSize);

            return buffer;
        };

        return testUtil.reloadModule('../lib/device/motor_device');
    }

    suite('.getSpeed(motorPort:number) => number', function () {
        var offsetByKey = {};

        offsetByKey.A = 4;
        offsetByKey.B = offsetByKey.A + 12;
        offsetByKey.C = offsetByKey.B + 12;
        offsetByKey.D = offsetByKey.C + 12;

        Object.keys(offsetByKey).forEach(function (key) {
            var motorPort = constants.MOTOR_PORT[key];

            [
                -100, -50, 0, 50, 100
            ].forEach(function (speed) {
                var description;

                description = 'should return ' + speed +
                    ' when passing MOTOR_PORT.' + key;

                test(description, function () {
                    var buffer = testUtil.createBuffer(bufferSize),
                        motorDevice = getMotorDevice(buffer);

                    buffer[offsetByKey[key]] = speed;

                    assert.strictEqual(motorDevice.getSpeed(motorPort), speed);
                });
            });
        });
    });

    // suite('.getTachoCount(motorPort:number) => number', function () {});
});
