import { TimerContainer } from "../js/timerContainer.js";

test('Test getTimeRemaining function', () => {

    let o_timer_cont = new TimerContainer();

    //Remaining time is default when session is not started
    o_timer_cont.n_start_time = new Date().getTime();
    o_timer_cont.n_curr_state = TimerContainer.NOT_STARTED;
    expect(o_timer_cont.getTimeRemaining()).toBe(0); 

    //Remaining time is equal to current state time(3000) when session is just started started
    o_timer_cont.n_curr_state = TimerContainer.WORK;
    o_timer_cont.n_start_time = new Date().getTime();
    expect(o_timer_cont.getTimeRemaining()).toBeGreaterThanOrEqual(2900);
    expect(o_timer_cont.getTimeRemaining()).toBeLessThanOrEqual(3000);

});

// test('Test TimerContainer.progressState', () => {
//     let o_timer_cont = new TimerContainer();

//     // Default state is session 'NOT STARTED' and no pomos have been completed
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.NOT_STARTED);
//     expect(o_timer_cont.n_done_pomos).toBe(0);

//     o_timer_cont.progressState();

//     // On progressState call, state changes from NOT STARTED to WORK and no pomos have been completed
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.WORK);
//     expect(o_timer_cont.n_done_pomos).toBe(0);

//     o_timer_cont.progressState();

//     // On progressState call, state changes from WORK to SHORT BREAK and 1 pomo have been completed
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.S_BREAK);
//     expect(o_timer_cont.n_done_pomos).toBe(1);

//     o_timer_cont.progressState();

//     // On progressState call, state changes from SHORT BREAK to WORK and no more pomos have been completed
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.WORK);
//     expect(o_timer_cont.n_done_pomos).toBe(1);

//     o_timer_cont.progressState();

//     // On progressState call, state changes from WORK to SHORT BREAK and 2 pomos have been completed
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.S_BREAK);
//     expect(o_timer_cont.n_done_pomos).toBe(2);

//     o_timer_cont.progressState();

//     // On progressState call, state changes from SHORT BREAK to WORK and no more pomos have been completed
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.WORK);
//     expect(o_timer_cont.n_done_pomos).toBe(2);

//     o_timer_cont.progressState();

//     // On progressState call, state changes from WORK to SHORT BREAK and 3 pomo have been completed
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.S_BREAK);
//     expect(o_timer_cont.n_done_pomos).toBe(3);

//     o_timer_cont.progressState();

//     // On progressState call, state changes from SHORT BREAK to WORK and no more pomos have been completed
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.WORK);
//     expect(o_timer_cont.n_done_pomos).toBe(3);

//     o_timer_cont.progressState();

//     // On progressState call, state changes from WORK to LONG BREAK and 4 pomo have been completed
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.L_BREAK);
//     expect(o_timer_cont.n_done_pomos).toBe(4);

//     o_timer_cont.progressState();

//     // On progressState call, state changes from LONG BREAK to WORK and completed pomos are reset back to 0
//     expect(o_timer_cont.n_curr_state).toBe(TimerContainer.WORK);
//     expect(o_timer_cont.n_done_pomos).toBe(0);

//     // Progress State Cycle succesfully achieved
// });



