'use strict';

var ev3 = require('../index'),
    motor = new ev3.Motor('ABCD');

console.log('ev3 started...');

ev3.button.up.on('press', function () {
    console.log('motor a speed: ' + ev3.Motor.getSpeed('A'));
    console.log('motor b speed: ' + ev3.Motor.getSpeed('B'));
    console.log('motor c speed: ' + ev3.Motor.getSpeed('C'));
    console.log('motor d speed: ' + ev3.Motor.getSpeed('D'));
});

ev3.button.enter.on('press', function () {
    console.log('battery voltage: ' + ev3.battery.getVoltage());
});

ev3.button.down.on('press', function () {
    console.log('motor a tachoCount: ' + ev3.Motor.getTachoCount('A'));
    console.log('motor b tachoCount: ' + ev3.Motor.getTachoCount('B'));
    console.log('motor c tachoCount: ' + ev3.Motor.getTachoCount('C'));
    console.log('motor d tachoCount: ' + ev3.Motor.getTachoCount('D'));
});

ev3.button.right.on('press', function () {
    motor.resetTachoCount();
    motor.setSpeed(50);
    motor.start();
});

ev3.button.left.on('press', function () {
    motor.stopAndBrake();
});

ev3.button.escape.on('press', function () {
    process.exit();
});
