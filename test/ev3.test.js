'use strict';

var ev3 = require('../index'),
    motor = ev3.motor,
    port = motor.PORT_A,
    intervalID;

motor.resetTachoCount(port);
motor.setSpeed(port, 50);
motor.start(port);

intervalID = setInterval(function () {
    var tachoCount = motor.getTachoCount()[motor.PORT_A];

    if (tachoCount >= 1000) {
        motor.stop(port);

        clearInterval(intervalID);

        setTimeout(function () {
            console.log(motor.getTachoCount()[motor.PORT_A]);
        }, 500);
    }
}, 1);
