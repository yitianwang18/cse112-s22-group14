const { TimerDisplay } = require("./timer");

// test(' ', () => {
//     expect().toBe();
// });

test('Test TimerDisplay.padZeroes()', () => {
    expect(TimerDisplay.padZeroes(4, 1)).toBe('4');
    expect(TimerDisplay.padZeroes(5, 3)).toBe('005');
    expect(TimerDisplay.padZeroes(54, 4)).toBe('0054');
    expect(TimerDisplay.padZeroes(65, 2)).toBe('65');
    expect(TimerDisplay.padZeroes(54675, 1)).toBe('54675');
    expect(TimerDisplay.padZeroes(44, 0)).toBe('44');
    expect(TimerDisplay.padZeroes(0, 20)).toBe('00000000000000000000');
    expect(TimerDisplay.padZeroes(443, 10)).toBe('0000000443');
});

test('Test TimerDisplay.formatMilliTime', () => {
    let millisecs;
    let milTime = function (min, sec) {
        return (min * 60 + sec) * 1000;
    };

    expect(TimerDisplay.formatMilliTime(-1)).toBe('00:00');
    expect(TimerDisplay.formatMilliTime(0)).toBe('00:00');

    millisecs = milTime(24, 59);
    expect(TimerDisplay.formatMilliTime(millisecs)).toBe('24:59');

    millisecs = milTime(4, 5);
    expect(TimerDisplay.formatMilliTime(millisecs)).toBe('04:05');

    millisecs = milTime(0, 59);
    expect(TimerDisplay.formatMilliTime(millisecs)).toBe('00:59');

    millisecs = milTime(4, 0);
    expect(TimerDisplay.formatMilliTime(millisecs)).toBe('04:00');

    millisecs = milTime(44, 59);
    expect(TimerDisplay.formatMilliTime(millisecs)).toBe('44:59');

});

