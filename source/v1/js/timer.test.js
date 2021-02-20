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

let milTime = function (min, sec) {
    return (min * 60 + sec) * 1000;
};

let timer_disp = new TimerDisplay();

test('Test timer-display element initialization', () => {
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


test('Start / Reset button Toggle', () => {
    let timer_cont = new TimerContainer(new TimerDisplay());
    let timer_cont_wrapper = timer_cont.querySelector("div");

    //initialize buttons
    let start_btn = timer_cont_wrapper.querySelector("#start-btn");
    let reset_btn = timer_cont_wrapper.querySelector("#reset-btn");
    let end_btn = timer_cont_wrapper.querySelector("#end-btn");

    //Test start button and reset button initialization
    expect(start_btn.innerText).toBe("Start Pomo!");
    expect(reset_btn.innerText).toBe("Reset Pomo");

    expect(start_btn.classList.contains("hidden")).toBe(false);
    expect(reset_btn.classList.contains("hidden")).toBe(true);

    //Test start button toggling to reset button once session starts
    start_btn.click();
    expect(start_btn.classList.contains("hidden")).toBe(true);
    expect(reset_btn.classList.contains("hidden")).toBe(false);

    //Test reset button not toggling back to start button if pomo is reset
    reset_btn.click();
    expect(start_btn.classList.contains("hidden")).toBe(true);
    expect(reset_btn.classList.contains("hidden")).toBe(false);

    //Test reset button toggling back to start button once session ends
    end_btn.click();
    expect(start_btn.classList.contains("hidden")).toBe(false);
    expect(reset_btn.classList.contains("hidden")).toBe(true);
});

//Test getTimeRemaining() function

function pause(time) {
    let start = new Date().getTime();
    let timeElapsed = 0;
    while (timeElapsed < time) {
        timeElapsed = new Date().getTime() - start; 
    }
}

// test('Test getTimeRemaining function', () => {

//     let timer_cont = new TimerContainer(new TimerDisplay());

//     timer_cont.n_start_time = new Date().getTime();
//     timer_cont.n_curr_state = TimerContainer.NOT_STARTED;
//     expect(timer_cont.getTimeRemaining()).toBe(0);

//     timer_cont.n_curr_state = TimerContainer.WORK;

//     timer_cont.n_start_time = new Date().getTime();
//     expect(timer_cont.getTimeRemaining()).toBe(3000);

//     timer_cont.n_start_time = new Date().getTime();
//     pause(1000);
//     expect(timer_cont.getTimeRemaining()).toBe(2000);

//     timer_cont.n_start_time = new Date().getTime();
//     pause(3000);
//     expect(timer_cont.getTimeRemaining()).toBe(0);

//     timer_cont.n_start_time = new Date().getTime();
//     pause(3001);
//     expect(timer_cont.getTimeRemaining()).toBe(-1);

//     timer_cont.n_start_time = new Date().getTime();
//     pause(4000);
//     expect(timer_cont.getTimeRemaining()).toBe(-1);
// });

//Test timer display 
test('Test timer-display in timer-container', () => {

    let timer_cont = new TimerContainer(new TimerDisplay());
    let timer_cont_wrapper = timer_cont.querySelector("div");

    let time_disp = timer_cont_wrapper.querySelector("#timer-display");

    let start_btn = timer_cont_wrapper.querySelector("#start-btn");
    let reset_btn = timer_cont_wrapper.querySelector("#reset-btn");
    let end_btn = timer_cont_wrapper.querySelector("#end-btn");


    console.log(timer_cont.n_start_time);

    expect(time_disp.getAttribute("time")).toBe("-1");
    expect(time_disp.getAttribute("pomos-comp")).toBe("0");
    expect(timer_cont.n_curr_state).toBe(TimerContainer.NOT_STARTED);

    start_btn.click();

    console.log(timer_cont.n_start_time);

    expect(parseInt(time_disp.getAttribute("time"))).toBeGreaterThanOrEqual(2000);
    expect(parseInt(time_disp.getAttribute("time"))).toBeLessThanOrEqual(3000);
    expect(time_disp.getAttribute("pomos-comp")).toBe("0");
    expect(timer_cont.n_curr_state).toBe(TimerContainer.WORK);

    pause(1000);

    console.log(timer_cont.n_start_time);

    time_disp = timer_cont_wrapper.querySelector("#timer-display");
    expect(parseInt(time_disp.getAttribute("time"))).toBeGreaterThanOrEqual(1000);
    expect(parseInt(time_disp.getAttribute("time"))).toBeLessThanOrEqual(2000);
    expect(time_disp.getAttribute("pomos-comp")).toBe("0");










});

// Test progressState() function

// Test resetPomo() function

// Test click Start button event

// Test click Reset button event

// Test click End button event

