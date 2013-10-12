'use strict';

var ev3 = require('../index'),
    motor = ev3.motor,
    port = motor.portA,
    intervalID;

motor.resetTachoCount(port);
motor.setSpeed(port, 80);
motor.start(port);

intervalID = setInterval(function () {
    console.log(motor.getSpeed());
}, 100);

setTimeout(function () {
    clearInterval(intervalID);

    console.log(motor.getTachoCount());

    motor.brake(port);
}, 60000);
