'use strict';

var ev3 = require('../index'),
    motor = ev3.motor,
    port = motor.PORT_A,
    intervalID;

motor.resetTachoCount(port);
motor.setSpeed(port, 10);
motor.start(port);

/*
var date;
var time = 0;
var count = 0;
var tachoCount = 0;
var diff = 0;

intervalID = setInterval(function () {
    var _tachoCount = motor.getTachoCount()[motor.PORT_A];

    if (tachoCount !== _tachoCount) {
        if (date) {
            diff = diff + _tachoCount - tachoCount;
            time = time + new Date().getTime() - date;
            count = count + 1;
        }

        tachoCount = _tachoCount;

        date = new Date().getTime();
    }
}, 1);
*/

intervalID = setInterval(function () {
    var tachoCount = motor.getTachoCount()[motor.PORT_A];

    if (tachoCount >= 1000) {
        motor.stop(port);

        clearInterval(intervalID);

        setTimeout(function () {
            console.log(motor.getTachoCount()[motor.PORT_A]);
        }, 1000);
    }
}, 1);

/*
setTimeout(function () {
    clearInterval(intervalID);

    console.log(time / count);
    console.log(diff / count);

    motor.stop(port);
}, 10000);
*/
