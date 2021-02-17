const { TimerDisplay } = require("./timer");
const { TimerContainer } = require("./timerContainer");

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p><body></body>`);
// test('Testing JSDom', () => {
//     expect(dom.window.document.querySelector("p").textContent).toBe('Hello world'); 
// });

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const dom = new JSDOM(`<!DOCTYPE html>
//   <script src="js/main.js"></script>
//   <script src="js/timer.js"></script>
//   <script src="js/timerContainer.js"></script>`);

let timer_disp = new TimerDisplay();
test('Test timer-display element', () => {
    //Test custom element timer-display shape
    let timer_disp_wrapper = timer_disp.querySelector("div"); 
    expect(timer_disp_wrapper.childElementCount).toBe(7);

    //Test timer-display.o_pomos_completed initialization
    expect(timer_disp_wrapper.querySelector("h3").innerText).toBe("Pomodoros Completed:");

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

    expect(TimerDisplay.formatMilliTime(-1)).toBe('--:--');
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

let timer_cont = new TimerContainer(timer_disp);
test('Test timer-element', () => {
    
    let timer_cont_wrapper = timer_cont.querySelector("div");

    //Test start button toggling to reset button
    let start_btn = timer_cont_wrapper.querySelector("#start-btn");
    let reset_btn = timer_cont_wrapper.querySelector("#reset-btn");

    expect(start_btn.innerText).toBe("Start Pomo!");
    expect(reset_btn.innerText).toBe("Reset Pomo");

    expect(start_btn.classList.contains("hidden")).toBe(false);
    expect(reset_btn.classList.contains("hidden")).toBe(true);

    start_btn.click();

    expect(start_btn.classList.contains("hidden")).toBe(true);
    expect(reset_btn.classList.contains("hidden")).toBe(false);

    //Test reset button toggling back to start button

    //Test getTimeRemaining() function

    //Test progressState() function

    //Test resetPomo() function

    //Test click Start button event

    //Test click Reset button event

    //Test click End button event
});


