import { TimerContainer } from "../js/timerContainer.js";

test("Test getTimeRemaining function", () => {
  document.body.innerHTML = "<timer-element></timer-element>";
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
  document.body.innerHTML = "<timer-element></timer-element>";
  let o_timer_cont = new TimerContainer();
  expect(o_timer_cont.n_curr_state).toBe(TimerContainer.N_NOT_STARTED);
  expect(o_timer_cont.n_done_pomos).toBe(0);
});

test("Test timer container handlePomoLength function", () => {
  document.body.innerHTML = "<timer-element></timer-element>";
  let n_input_time = 1200000;
  TimerContainer.handlePomoLength(n_input_time);
  let n_work_time = TimerContainer.A_STATE_DURATIONS[0];
  expect(n_work_time).toBe(n_input_time);
});

test("Test timer container handleShortBreak function", () => {
  document.body.innerHTML = "<timer-element></timer-element>";
  let n_input_time = 450000;
  TimerContainer.handleShortBreak(n_input_time);
  let n_short_break= TimerContainer.A_STATE_DURATIONS[1];
  expect(n_short_break).toBe(n_input_time);

});

test("Test timer container handleLongBreak function", () => {
  document.body.innerHTML = "<timer-element></timer-element>";
  let n_input_time = 1800000;
  TimerContainer.handleLongBreak(n_input_time);
  let n_short_break= TimerContainer.A_STATE_DURATIONS[2];
  expect(n_short_break).toBe(n_input_time);
});



