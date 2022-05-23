import { TimerContainer } from "../js/timerContainer.js";

test("Test getTimeRemaining function", () => {

    let o_timer_cont = new TimerContainer();

    if (!TimerContainer.B_DEBUG) {
        o_timer_cont.toggleDebug();
    }

    //Remaining time is default when session is not started
    o_timer_cont.n_start_time = new Date().getTime();
    o_timer_cont.n_curr_state = TimerContainer.N_NOT_STARTED;
    expect(o_timer_cont.getTimeRemaining()).toBe(0);

    //Remaining time is equal to current state time(3000) when session is just started started
    o_timer_cont.n_curr_state = TimerContainer.N_WORK;
    o_timer_cont.n_start_time = new Date().getTime();
    expect(o_timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(2900);
    expect(o_timer_cont.getTimeRemaining()).toBeLessThanOrEqual(3000);

});

test("Test timer container default values", () => {
    let o_timer_cont = new TimerContainer();
    expect(o_timer_cont.n_curr_state).toBe(TimerContainer.N_NOT_STARTED);
    expect(o_timer_cont.n_done_pomos).toBe(0);
});

