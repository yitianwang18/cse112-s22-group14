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

