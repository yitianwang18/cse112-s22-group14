import { TimerDisplay } from "../js/timer.js";

test('Test timer-display element initialization', () => {
    //Test custom element timer-display shape
    let timer_disp = new TimerDisplay();
    let timer_disp_wrapper = timer_disp.querySelector("div"); 
    expect(timer_disp_wrapper.childElementCount).toBe(7);

    //Test timer-display.o_pomos_completed initialization
    expect(timer_disp_wrapper.querySelector("h3").innerText).toBe("Number of Pomodoros Completed:");

    //Test timer-diplay.o_pomo_images initialization
    let pomo_images = timer_disp_wrapper.querySelectorAll("img");
    const ACTUAL_POMO_NO_PATH = "http://localhost" + TimerDisplay.S_POMO_NO_PATH.substring(1);
    for (let i = 0; i < 4; ++i) {
        expect(pomo_images[i].src).toBe(ACTUAL_POMO_NO_PATH);
    } 
});

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



