'use strict';

var $ = require('./constants'),
    analogDevice = require('./analog_device'),
    motorDevice = require('./motor_device'),
    pwmDevice = require('./pwm_device'),
    uiDevice = require('./ui_device');

function testMotor() {
    var count = 0,
        speed = 0,
        voltage = 0,
        intervalID,
        time;

    function interval() {
        count += 1;
        speed += motorDevice.getSpeed($.MOTOR_A_PORT);
        voltage += analogDevice.getVoltage();
    }

    function timeout() {
        var elapsedTime = new Date().getTime() - time,
            tachCount = motorDevice.getTachoCount($.MOTOR_A_PORT),
            averageSpeed = speed / count,
            averageVoltage = voltage / count;

        console.log('Elapsed time: ' + elapsedTime);
        console.log('Average speed: ' + averageSpeed);
        console.log('Average voltage: ' + averageVoltage);
        console.log('Tacho count: ' + tachCount);
        console.log('Interval count: ' + count);

        clearInterval(intervalID);

        pwmDevice.stop(1, $.MOTOR_A_PORT);
    }

    pwmDevice.resetTachoCount($.MOTOR_A_PORT);
    pwmDevice.setSpeed(75, $.MOTOR_A_PORT);
    //pwmDevice.setPower(75, $.MOTOR_A_PORT);
    pwmDevice.start($.MOTOR_A_PORT);

    time = new Date().getTime();

    setTimeout(timeout, 2000);

    intervalID = setInterval(interval, 1);
}

testMotor();
