    import { TimerDisplay } from "../js/timer.js";

test('Test timer-display element initialization', () => {
    //Test custom element timer-display shape
    let o_timer_disp = new TimerDisplay();
    let o_timer_disp_wrapper = o_timer_disp.querySelector("div");
    expect(o_timer_disp_wrapper.childElementCount).toBe(7);

    //Test timer-display.o_pomos_completed initialization
    expect(o_timer_disp_wrapper.querySelector("h3").innerText).toBe("Pomodoros Completed:");

    //Test timer-diplay.o_pomo_images initialization
    let o_pomo_images = o_timer_disp_wrapper.querySelectorAll("img");
    const ACTUAL_POMO_NO_PATH = "http://localhost" + TimerDisplay.S_POMO_NO_PATH.substring(1);
    for (let i = 0; i < 4; ++i) {
        expect(o_pomo_images[i].src).toBe(ACTUAL_POMO_NO_PATH);
    }
});

test('Test padStart()', () => {
    expect("4".padStart(1, "0")).toBe('4');
    expect("5".padStart(3, "0")).toBe('005');
    expect("54".padStart(4, "0")).toBe('0054');
    expect("65".padStart(2, "0")).toBe('65');
    expect("54675".padStart(1, "0")).toBe('54675');
    expect("44".padStart(0, "0")).toBe('44');
    expect("0".padStart(20, "0")).toBe('00000000000000000000');
    expect("443".padStart(10, "0")).toBe('0000000443');
});

test('Test TimerDisplay.formatMilliTime', () => {
    let n_millisecs;
    let milTime = function (min, sec) {
        return (min * 60 + sec) * 1000;
    };

    expect(TimerDisplay.formatMilliTime(-1)).toBe('25:00');
    expect(TimerDisplay.formatMilliTime(0)).toBe('00:00');

    n_millisecs = milTime(24, 59);
    expect(TimerDisplay.formatMilliTime(n_millisecs)).toBe('24:59');

    n_millisecs = milTime(4, 5);
    expect(TimerDisplay.formatMilliTime(n_millisecs)).toBe('04:05');

    n_millisecs = milTime(0, 59);
    expect(TimerDisplay.formatMilliTime(n_millisecs)).toBe('00:59');

    n_millisecs = milTime(4, 0);
    expect(TimerDisplay.formatMilliTime(n_millisecs)).toBe('04:00');

    n_millisecs = milTime(44, 59);
    expect(TimerDisplay.formatMilliTime(n_millisecs)).toBe('44:59');

});



