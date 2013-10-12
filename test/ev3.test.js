'use strict';

var ev3 = require('ev3'),
    motor = ev3.motor,
    port = motor.portA | motor.portB;

motor.setSpeed(10, port);

motor.start(port);

setTimeout(function () {
    console.log('Speed:');
    console.log(motor.getSpeed());
    console.log('TachoCount:');
    console.log(motor.getTachoCount());

    motor.resetTachoCount(port);

    setTimeout(function () {
        console.log('Speed:');
        console.log(motor.getSpeed());
        console.log('TachoCount:');
        console.log(motor.getTachoCount());

        motor.coast(port);
    }, 4000);
}, 1000);
