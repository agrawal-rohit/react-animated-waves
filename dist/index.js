'use strict';

var React = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// Linear interpolation function
// This function is used to smoothly transition between two values
var lerp = function (a, b, t) {
    return a + t * (b - a);
};
// Function to convert a hexadecimal color to RGBA
var hexToRgba = function (hex, alpha) {
    if (alpha === void 0) { alpha = 1; }
    if (hex[0] === "#") {
        hex = hex.slice(1);
    }
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
};
var Waves = function (_a) {
    var _b = _a.amplitude, amplitude = _b === void 0 ? 20 : _b, _c = _a.colors, colors = _c === void 0 ? ["#436EDB"] : _c, props = __rest(_a, ["amplitude", "colors"]);
    var amplitudeRef = React.useRef(amplitude);
    var canvasRef = React.useRef(null);
    var targetAmplitudeRef = React.useRef(amplitude);
    // Update the target amplitude whenever the amplitude prop changes
    React.useEffect(function () {
        targetAmplitudeRef.current = amplitude;
    }, [amplitude]);
    // Function to draw the waveform on the canvas
    var drawWaveform = React.useCallback(function (ctx, amplitude, frequency, color, phase) {
        if (phase === void 0) { phase = 0; }
        ctx.strokeStyle = color;
        ctx.beginPath();
        // Draw the waveform
        for (var i = 0; i < ctx.canvas.width; i++) {
            // Compute the pinching effect
            var sineWave = Math.sin(Math.PI * (i / ctx.canvas.width));
            var pinch = Math.pow(sineWave, 6);
            // Calculate the y position with sine function, pinch effect, and time-based phase shift
            var y = amplitude * Math.sin(frequency * i + phase) * pinch;
            ctx.lineTo(i, ctx.canvas.height / 2 + y);
        }
        ctx.stroke();
    }, []);
    // Animate the waveform
    React.useEffect(function () {
        var animationFrameId;
        var canvas = canvasRef.current;
        var ctx = canvas.getContext("2d");
        var parent = canvas.parentElement;
        if (parent)
            canvas.width = parent.clientWidth;
        var animate = function () {
            var time = Date.now() * 0.0015; // Convert milliseconds to seconds and increase speed
            amplitudeRef.current = lerp(amplitudeRef.current, targetAmplitudeRef.current, 0.1);
            // Create an oscillating effect with amplitude
            var oscillatingAmplitude = amplitudeRef.current * (1 + Math.sin(time) * 0.05);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Define primary waveforms with their respective amplitudes, frequencies, and colors
            var primaryWaveforms = [
                {
                    amplitude: oscillatingAmplitude,
                    frequency: 0.02,
                    alpha: 0.6,
                    speed: 0.001,
                },
                {
                    amplitude: oscillatingAmplitude * 0.6,
                    frequency: 0.03,
                    alpha: 0.4,
                    speed: 0.004,
                },
                {
                    amplitude: oscillatingAmplitude * 0.3,
                    frequency: 0.04,
                    alpha: 0.2,
                    speed: 0.007,
                },
            ];
            var _loop_1 = function (primary) {
                var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                var stopIncrement = colors.length > 1 ? 1 / (colors.length - 1) : 0;
                colors.forEach(function (color, index) {
                    gradient.addColorStop(stopIncrement * index, hexToRgba(color, primary.alpha));
                });
                drawWaveform(ctx, primary.amplitude, primary.frequency, gradient, Date.now() * primary.speed);
                var _loop_2 = function (i) {
                    var amp = primary.amplitude - i * 0.1;
                    var freq = primary.frequency + i * 0.00025;
                    var alpha = primary.alpha * 0.6 - i * 0.01;
                    var gradient_1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                    var stopIncrement_1 = colors.length > 1 ? 1 / (colors.length - 1) : 0;
                    colors.forEach(function (color, index) {
                        gradient_1.addColorStop(stopIncrement_1 * index, hexToRgba(color, alpha));
                    });
                    drawWaveform(ctx, amp, freq, gradient_1, Date.now() * primary.speed + i * 0.015);
                };
                // Draw secondary waveforms around the primary waveform
                for (var i = 0; i < 30; i++) {
                    _loop_2(i);
                }
            };
            // For each primary waveform, draw the waveform and its surrounding mesh
            for (var _i = 0, primaryWaveforms_1 = primaryWaveforms; _i < primaryWaveforms_1.length; _i++) {
                var primary = primaryWaveforms_1[_i];
                _loop_1(primary);
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        // Clean up the animation frame when the component unmounts
        return function () {
            cancelAnimationFrame(animationFrameId);
        };
    }, [colors, drawWaveform]);
    // Render the canvas 
    return (React.createElement("canvas", __assign({ ref: canvasRef, width: "100%", height: "auto" }, props)));
};
// Export the memoized version of the component to avoid unnecessary re-renders
var index = React.memo(Waves);

module.exports = index;
//# sourceMappingURL=index.js.map
