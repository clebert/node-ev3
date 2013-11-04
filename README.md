# ev3 [![Build Status](https://travis-ci.org/clebert/ev3.png?branch=master)](https://travis-ci.org/clebert/ev3)

Node.js for Lego Mindstorms EV3.

## Installation

    $ npm install ev3

## Usage

    var ev3 = require('ev3');

### Battery

#### ev3.battery.getVoltage() => number

    var voltage = ev3.battery.getVoltage();

### Button

#### ev3.button.[down | enter | escape | left | right | up] => EventEmitter

    ev3.button.escape.on('press', function () {
        ...
    });

    ev3.button.escape.on('release', function () {
        ...
    });

#### ev3.button.[down | enter | escape | left | right | up].isPressed() => boolean

    var pressed = ev3.button.down.isPressed();

### Motor

#### ev3.Motor.getSpeed(portName:string) => number

Returns the speed in degrees per second.

    var speedA = ev3.Motor.getSpeed('A');
    var speedB = ev3.Motor.getSpeed('B');
    var speedC = ev3.Motor.getSpeed('C');
    var speedD = ev3.Motor.getSpeed('D');

#### ev3.Motor.getTachoCount(portName:string) => number

    var tachoCountA = ev3.Motor.getTachoCount('A');
    var tachoCountB = ev3.Motor.getTachoCount('B');
    var tachoCountC = ev3.Motor.getTachoCount('C');
    var tachoCountD = ev3.Motor.getTachoCount('D');

#### ev3.Motor(portNames:string) => Motor

    var motor = new ev3.Motor('ABCD');
    var motorAB = new ev3.Motor('AB');
    var motorC = new ev3.Motor('C');

#### motor.resetTachoCount([callback:Function]) => void

    motor.resetTachoCount(); // synchronous form

    motor.resetTachoCount(function (error) {
        ...
    }); // asynchronous form

#### motor.setPolarity(polarity:number[, callback:Function]) => void

Polarity:

* -1 makes the motor run backward
* 1 makes the motor run forward
* 0 makes the motor run in the opposite direction

<!-- -->

    motor.setPolarity(-1); // synchronous form

    motor.setPolarity(-1, function (error) {
        ...
    }); // asynchronous form

#### motor.setPower(power:number[, callback:Function]) => void

Power: -100%..100%

    motor.setPower(-100); // synchronous form

    motor.setPower(-100, function (error) {
        ...
    }); // asynchronous form

#### motor.setSpeed(speed:number[, callback:Function]) => void

Speed: -1000..1000 degrees per second

    motor.setSpeed(-1000); // synchronous form

    motor.setSpeed(-1000, function (error) {
        ...
    }); // asynchronous form

#### motor.start([callback:Function]) => void

    motor.start(); // synchronous form

    motor.start(function (error) {
        ...
    }); // asynchronous form

#### motor.stop([callback:Function]) => void

    motor.stop(); // synchronous form

    motor.stop(function (error) {
        ...
    }); // asynchronous form

#### motor.stopAndBrake([callback:Function]) => void

    motor.stopAndBrake(); // synchronous form

    motor.stopAndBrake(function (error) {
        ...
    }); // asynchronous form

## Running tests

    $ make test

## Linting sources

    $ make lint

## License

The MIT License (MIT)

Copyright (c) 2013 Clemens Akens (http://clebert.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
