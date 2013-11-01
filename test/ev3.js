'use strict';

var ev3 = require('../index');

ev3.button.enter.on('press', function () {
    console.log('Up button pressed!');

    console.log('Battery voltage: ' + ev3.battery.getVoltage());
});

ev3.button.enter.on('release', function () {
    console.log('Up button released!');
});
