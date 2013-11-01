'use strict';

var ev3 = require('../index');

console.log('ev3 started...');

ev3.button.up.on('press', function () {
    console.log('up button pressed!');
});

ev3.button.enter.on('press', function () {
    console.log('enter button pressed!');

    console.log('battery voltage: ' + ev3.battery.getVoltage());
});

ev3.button.down.on('press', function () {
    console.log('down button pressed!');
});

ev3.button.right.on('press', function () {
    console.log('right button pressed!');
});

ev3.button.left.on('press', function () {
    console.log('left button pressed!');
});

ev3.button.escape.on('press', function () {
    console.log('escape button pressed!');

    process.exit();
});
