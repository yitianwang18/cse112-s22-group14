import { TimerContainer } from "../js/timerContainer.js";
import { jest, beforeAll, afterAll } from '@jest/globals';
import EventBus from "./EventBus.js";

const o_jsdom_notification = window.Notification;
const f_jsdom_alert = window.alert;
const p_permission = Promise.resolve("granted");
const o_audio = document.createElement("audio");
HTMLAudioElement.prototype.play = jest.fn();
o_audio.id = "notifs";
o_audio.src = "assets/audio/notif_tone.mp3";

beforeAll(() => {
    
    document.body.appendChild(o_audio);
    
    window.alert = jest.fn();

    window.Notification = jest.fn();
    window.Notification.permission = "default";
    window.Notification.requestPermission = jest.fn(() => {
        window.Notification.permission = "granted";
        return p_permission;
    });
});

afterAll(()=>{
    window.Notification = o_jsdom_notification;
    window.alert = f_jsdom_alert;        
});

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

test("Test title timer display", () => {
    let o_timer_cont = new TimerContainer();
    expect(document.title).toBe("Powelldoro Timer");

    o_timer_cont.n_curr_state = TimerContainer.N_WORK;
    o_timer_cont.n_start_time = new Date().getTime();
    o_timer_cont.renderComponents();
    expect(document.title).toBe("20:00");
});

test("Test progressing through different states", () => {
    // use mock Event object, since doesn't exist within tests
    document.EventBus = new EventBus();
    let o_timer_cont = new TimerContainer();

    // work state with 0 pomos done 
    o_timer_cont.n_curr_state = TimerContainer.N_WORK;
    o_timer_cont.progressState();
    expect(o_timer_cont.n_done_pomos).toBe(1);
    expect(o_timer_cont.n_curr_state).toBe(TimerContainer.N_S_BREAK);

    // work state with 4 pomos (max) done
    o_timer_cont.n_curr_state = TimerContainer.N_WORK;
    o_timer_cont.n_done_pomos = 3;
    o_timer_cont.progressState();
    expect(o_timer_cont.n_done_pomos).toBe(4);
    expect(o_timer_cont.n_curr_state).toBe(TimerContainer.N_L_BREAK);

    // long break
    o_timer_cont.n_curr_state = TimerContainer.N_L_BREAK;
    o_timer_cont.progressState();
    expect(o_timer_cont.n_done_pomos).toBe(0);

    // short break
    o_timer_cont.n_curr_state = TimerContainer.N_S_BREAK;
    o_timer_cont.progressState();

    // not started 
    o_timer_cont.n_curr_state = TimerContainer.N_NOT_STARTED;
    o_timer_cont.progressState();
    expect(o_timer_cont.n_curr_state).toBe(TimerContainer.N_WORK);
});

test("Test beginSession in different states", () => {
    jest.useFakeTimers();
    let o_timer_cont = new TimerContainer();
    o_timer_cont.n_start_time = new Date().getTime();

    // work state (0) - a state other than not started
    o_timer_cont.n_curr_state = TimerContainer.N_WORK;
    o_timer_cont.beginSession();
    jest.advanceTimersByTime(TimerContainer.N_MILLI_DELAY);
    expect(document.title).toBe("Powelldoro Timer");

    // not started 
    o_timer_cont.n_curr_state = TimerContainer.N_NOT_STARTED;
    o_timer_cont.beginSession();
    jest.advanceTimersByTime(TimerContainer.N_MILLI_DELAY);
    expect(document.title).toBe("20:00");
});

test("Test endSession shifts to correct state", () => {
    jest.useFakeTimers();
    let o_timer_cont = new TimerContainer();
    o_timer_cont.n_curr_state = TimerContainer.N_WORK;
    o_timer_cont.endSession();
    jest.advanceTimersByTime(TimerContainer.N_MILLI_DELAY);
    expect(o_timer_cont.n_curr_state).toBe(TimerContainer.N_NOT_STARTED);
});