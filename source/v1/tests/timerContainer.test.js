import { TimerContainer } from "../js/timerContainer.js";

test('Start / Reset button Toggle', () => {
    let timer_cont = new TimerContainer();
    let timer_cont_wrapper = timer_cont.querySelector("div");

    //initialize buttons
    let start_btn = timer_cont_wrapper.querySelector("#start-btn");
    let reset_btn = timer_cont_wrapper.querySelector("#reset-btn");
    let end_btn = timer_cont_wrapper.querySelector("#end-btn");

    //Test start button and reset button initialization
    expect(start_btn.innerText).toBe("Start Pomo!");
    expect(reset_btn.innerText).toBe("Reset Pomo!");

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

function pause(time) {
    let start = new Date().getTime();
    let timeElapsed = 0;
    while (timeElapsed < time) {
        timeElapsed = new Date().getTime() - start;
    }
}

test('Test getTimeRemaining function', () => {

    let timer_cont = new TimerContainer();

    //Remaining time is default when session is not started
    timer_cont.n_start_time = new Date().getTime();
    timer_cont.n_curr_state = TimerContainer.NOT_STARTED;
    expect(timer_cont.getTimeRemaining()).toBe(0); 

    //Remaining time is equal to current state time(3000) when session is just started started
    timer_cont.n_curr_state = TimerContainer.WORK;
    timer_cont.n_start_time = new Date().getTime();
    expect(timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(2900);
    expect(timer_cont.getTimeRemaining()).toBeLessThanOrEqual(3000);

    //Remaining time is equal to current state time(3000) - elapsed time(1000) after some time has elapsed
    timer_cont.n_start_time = new Date().getTime();
    pause(1000);
    expect(timer_cont.getTimeRemaining()).toBeLessThanOrEqual(2000);
    expect(timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(1990);

    //Remaining time is equal to 0 after all of current state time has elapsed
    timer_cont.n_start_time = new Date().getTime();
    pause(3000);
    expect(timer_cont.getTimeRemaining()).toBe(0);

    //Remaining time is equal to -1 if time elapsed exceedes current state time
    timer_cont.n_start_time = new Date().getTime();
    pause(3001);
    expect(timer_cont.getTimeRemaining()).toBe(-1);

    //Remaining time is equal to -1 if time elapsed exceedes current state time
    timer_cont.n_start_time = new Date().getTime();
    pause(4000);
    expect(timer_cont.getTimeRemaining()).toBe(-1);

});

test('Test TimerContainer.progressState', () => {
    let timer_cont = new TimerContainer();

    // Default state is session 'NOT STARTED' and no pomos have been completed
    expect(timer_cont.n_curr_state).toBe(TimerContainer.NOT_STARTED);
    expect(timer_cont.n_done_pomos).toBe(0);

    timer_cont.progressState();

    // On progressState call, state changes from NOT STARTED to WORK and no pomos have been completed
    expect(timer_cont.n_curr_state).toBe(TimerContainer.WORK);
    expect(timer_cont.n_done_pomos).toBe(0);

    timer_cont.progressState();

    // On progressState call, state changes from WORK to SHORT BREAK and 1 pomo have been completed
    expect(timer_cont.n_curr_state).toBe(TimerContainer.S_BREAK);
    expect(timer_cont.n_done_pomos).toBe(1);

    timer_cont.progressState();

    // On progressState call, state changes from SHORT BREAK to WORK and no more pomos have been completed
    expect(timer_cont.n_curr_state).toBe(TimerContainer.WORK);
    expect(timer_cont.n_done_pomos).toBe(1);

    timer_cont.progressState();

    // On progressState call, state changes from WORK to SHORT BREAK and 2 pomos have been completed
    expect(timer_cont.n_curr_state).toBe(TimerContainer.S_BREAK);
    expect(timer_cont.n_done_pomos).toBe(2);

    timer_cont.progressState();

    // On progressState call, state changes from SHORT BREAK to WORK and no more pomos have been completed
    expect(timer_cont.n_curr_state).toBe(TimerContainer.WORK);
    expect(timer_cont.n_done_pomos).toBe(2);

    timer_cont.progressState();

    // On progressState call, state changes from WORK to SHORT BREAK and 3 pomo have been completed
    expect(timer_cont.n_curr_state).toBe(TimerContainer.S_BREAK);
    expect(timer_cont.n_done_pomos).toBe(3);

    timer_cont.progressState();

    // On progressState call, state changes from SHORT BREAK to WORK and no more pomos have been completed
    expect(timer_cont.n_curr_state).toBe(TimerContainer.WORK);
    expect(timer_cont.n_done_pomos).toBe(3);

    timer_cont.progressState();

    // On progressState call, state changes from WORK to LONG BREAK and 4 pomo have been completed
    expect(timer_cont.n_curr_state).toBe(TimerContainer.L_BREAK);
    expect(timer_cont.n_done_pomos).toBe(4);

    timer_cont.progressState();

    // On progressState call, state changes from LONG BREAK to WORK and completed pomos are reset back to 0
    expect(timer_cont.n_curr_state).toBe(TimerContainer.WORK);
    expect(timer_cont.n_done_pomos).toBe(0);

    // Progress State Cycle succesfully achieved
});

test('Test TimerContainer.beginSession()', () => {
    let timer_cont = new TimerContainer();
    let rem_time;

    // Default state is session 'NOT STARTED' and default time remaining is 0
    expect(timer_cont.n_curr_state).toBe(TimerContainer.NOT_STARTED);
    rem_time = timer_cont.getTimeRemaining();
    expect(rem_time).toBe(-1);

    timer_cont.beginSession();

    // When session begins, state changes from NOT STARTED to WORK and time remaining becomes work time(3000)
    expect(timer_cont.n_curr_state).toBe(TimerContainer.WORK);
    rem_time = timer_cont.getTimeRemaining();
    expect(rem_time).toBeGreaterThanOrEqual(2900);
    expect(rem_time).toBeLessThanOrEqual(3000);

    // If session has already began, state is not affected
    timer_cont.n_curr_state = TimerContainer.WORK;
    timer_cont.beginSession();
    expect(timer_cont.n_curr_state).toBe(TimerContainer.WORK);

    timer_cont.n_curr_state = TimerContainer.S_BREAK;
    timer_cont.beginSession();
    expect(timer_cont.n_curr_state).toBe(TimerContainer.S_BREAK);

    timer_cont.n_curr_state = TimerContainer.L_BREAK;
    timer_cont.beginSession();
    expect(timer_cont.n_curr_state).toBe(TimerContainer.L_BREAK);
});

test('Test TimerContainer.resetPomo()', () => {
    let timer_cont = new TimerContainer();

    //If current state is WORK, then reset timer on resetPomo() call
    timer_cont.n_curr_state = TimerContainer.WORK;
    timer_cont.n_start_time = new Date().getTime();
    
    expect(timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(2990);
    expect(timer_cont.getTimeRemaining()).toBeLessThanOrEqual(3000);
    
    pause(1000);
    
    // after a pause of 1000, our timer should have come down to 1990 - 2000 (10ms error allowed to account for processing time)
    expect(timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(1990);  
    expect(timer_cont.getTimeRemaining()).toBeLessThanOrEqual(2000);    
    
    timer_cont.resetPomo();

    // after reset, our timer go back to 2990 - 3000 (10ms error allowed to account for processing time)
    expect(timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(2990); 
    expect(timer_cont.getTimeRemaining()).toBeLessThanOrEqual(3000);    

    //If current state is not WORK, then resetPomo() call should have no effect

    timer_cont.n_curr_state = TimerContainer.S_BREAK;
    timer_cont.n_start_time = new Date().getTime();
    expect(timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(2900);
    expect(timer_cont.getTimeRemaining()).toBeLessThanOrEqual(3000);
    pause(1000);
    timer_cont.resetPomo();
    // timer isn't reset to 3000 (remains between 1990 and 2000)
    expect(timer_cont.getTimeRemaining()).toBeLessThanOrEqual(2000); 
    expect(timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(1990); 

    timer_cont.n_curr_state = TimerContainer.L_BREAK;
    timer_cont.n_start_time = new Date().getTime();
    expect(timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(2900);
    expect(timer_cont.getTimeRemaining()).toBeLessThanOrEqual(3000);
    pause(1000);
    timer_cont.resetPomo();
    // timer isn't reset to 3000 (remains between 1990 and 2000)
    expect(timer_cont.getTimeRemaining()).toBeLessThanOrEqual(2000); 
    expect(timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(1990); 
});

test('Test TimerContainer.endSession()', () => {
    let timer_cont = new TimerContainer();

    // If session hasn't started, calling endSession will have no effect
    timer_cont.n_curr_state = TimerContainer.NOT_STARTED;
    timer_cont.endSession();
    expect(timer_cont.n_curr_state).toBe(TimerContainer.NOT_STARTED);

    // If session has started, calling endSession will end the session and the state will reset to session NOT STARTED
    timer_cont.n_curr_state = TimerContainer.WORK;
    timer_cont.endSession();
    expect(timer_cont.n_curr_state).toBe(TimerContainer.NOT_STARTED);

    timer_cont.n_curr_state = TimerContainer.S_BREAK;
    timer_cont.endSession();
    expect(timer_cont.n_curr_state).toBe(TimerContainer.NOT_STARTED);

    timer_cont.n_curr_state = TimerContainer.L_BREAK;
    timer_cont.endSession();
    expect(timer_cont.n_curr_state).toBe(TimerContainer.NOT_STARTED);
});

