import { TimerDisplay } from "./timer.js";
import { notify } from "./notify.js"

// variable for turning on/off console logs used for debugging
// const B_CONSOLE_LOG = false;

/**
 * Custom HTML element for a TimerContainer, including the display and functionality
 * @extends HTMLElement
 */
class TimerContainer extends HTMLElement {

    /**
     * Constructs a new Timer Container, initializes elements, and assigns event listeners
     */
    constructor() {
        super();
        // initialization wrappers
        let o_wrapper = document.createElement("div");
        o_wrapper.className = "timer-box";

        let o_work_message = document.createElement("h1");
        o_work_message.id = "work-message";

        // initialize timerdisplay instance
        let o_timer_display = new TimerDisplay();
        o_timer_display.setAttribute("pomos-comp", 0);

        // initialize timerdisplay instance based on user settings
        if(window.localStorage.getItem("timer_settings") != null) {
            let o_timer_settings = window.localStorage.getItem("timer_settings");
            o_timer_settings = JSON.parse(o_timer_settings);
            TimerContainer.A_STATE_DURATIONS = o_timer_settings;
            o_timer_display.setAttribute("pomo-length", o_timer_settings[0]);
        } else {
            o_timer_display.setAttribute("time", 0);
            o_timer_display.setAttribute("pomo-length", 1500000);
            window.localStorage.setItem("timer_settings", 
                JSON.stringify(TimerContainer.A_STATE_DURATIONS));
        }
      
        // setting timer display theme default to stars
        o_timer_display.setAttribute("theme", "stars");

        let o_wrap_start_btn = document.createElement("span");
        o_wrap_start_btn.id = "wrap-start-btn";
        o_wrap_start_btn.className = "btn-wrapper";

        // initialize start button
        let o_start_btn = document.createElement("button");
        o_start_btn.id = "start-btn";
        o_start_btn.title = "Start Work Session (space)";
        o_start_btn.className = "custom-btn";
        o_start_btn.innerText = TimerContainer.S_BEGIN_MESSAGE;

        const f_fire_start_session = () => { document.EventBus.fireEvent("startSession") };
        o_start_btn.addEventListener("click", f_fire_start_session);

        // initialize reset button
        let o_reset_btn = document.createElement("button");
        o_reset_btn.id = "reset-btn";
        o_reset_btn.title = "Restart This Interval";
        o_reset_btn.classList.add("custom-btn", "hidden");
        o_reset_btn.innerText = TimerContainer.S_RESET_MESSAGE;
        o_reset_btn.addEventListener("click", this.handleResetPomo.bind(this));

        let o_reset_error_mssg = document.createElement("span");
        o_reset_error_mssg.id = "reset-error";
        o_reset_error_mssg.className = "error-mssg";

        o_wrap_start_btn.append(o_start_btn, o_reset_btn, o_reset_error_mssg);

        // initialize end button
        let o_wrap_end_btn = document.createElement("span");
        o_wrap_end_btn.id = "wrap-end-btn";
        o_wrap_end_btn.className = "btn-wrapper";

        let o_end_btn = document.createElement("button");
        o_end_btn.id = "end-btn";
        o_end_btn.title = "End Work Session (space)";
        o_end_btn.className = "custom-btn";
        o_end_btn.innerText = TimerContainer.S_END_MESSAGE;
        const f_fire_end_session = () => { document.EventBus.fireEvent("endSession") };
        o_end_btn.addEventListener("click", f_fire_end_session);

        o_wrap_end_btn.append(o_end_btn);

        o_wrapper.append(o_work_message, o_timer_display, o_wrap_start_btn, o_wrap_end_btn);

        this.append(o_wrapper);

        // initialize state variables
        this.n_start_time = -1;
        this.n_curr_state = TimerContainer.N_NOT_STARTED;
        this.n_done_pomos = 0;
        this.n_interval_id = -1;

        this.handleEndSession();
    }

    /**
     * Event handler function for when the "start session" button is pressed. 
     * Hides/shows relevant elements, and triggers errors
     * @param {Event} o_event The event instance
     */
    handleStartPomo() {
        this.beginSession();
        this.querySelector("#reset-btn").classList.remove("hidden");
        this.querySelector("#start-btn").classList.add("hidden");
        this.querySelector("#end-btn").disabled = false;
        this.querySelector("#end-btn").style.cursor = "pointer";
        this.renderComponents();
    }

    // Event Handlers
    /**
     * Event handler function for when the pomodoro length is adjusted
     * @param {number} n_work_time - the pomodoro length in milliseconds
     */
    static handlePomoLength(n_work_time) {
        let o_timer_display = document.querySelector("timer-display");
        o_timer_display.setAttribute("time", n_work_time);
        o_timer_display.setAttribute("pomo-length", n_work_time);
        TimerContainer.A_STATE_DURATIONS[0] = n_work_time;
        window.localStorage.setItem("timer_settings", 
            JSON.stringify(TimerContainer.A_STATE_DURATIONS));
        
    }

    /**
     * Event handler function for when the short break time is adjusted
     * @param {number} n_short_break - the short break time in milliseconds
     */
    static handleShortBreak(n_short_break) {
        TimerContainer.A_STATE_DURATIONS[1] = n_short_break;
        window.localStorage.setItem("timer_settings", 
            JSON.stringify(TimerContainer.A_STATE_DURATIONS));
    }

    /**
     * Event handler function for when the long break time is adjusted
     * @param {number} n_long_break - the long break time in milliseconds
     */
    static handleLongBreak(n_long_break) {
        TimerContainer.A_STATE_DURATIONS[2] = n_long_break;
        window.localStorage.setItem("timer_settings", 
            JSON.stringify(TimerContainer.A_STATE_DURATIONS));
    }

    /**
     * Event handler function for when the "reset pomo" button is pressed
     */
    handleResetPomo() {
        this.resetPomo();
        this.renderComponents();
    }

    /**
     * Event handler function for when the "end session" button is pressed
     */
    handleEndSession() {
        this.endSession();
        this.renderComponents();
        this.querySelector("#end-btn").disabled = true;
        this.querySelector("#end-btn").style.cursor = "not-allowed";
        this.querySelector("#reset-btn").classList.add("hidden");
        this.querySelector("#reset-btn").disabled = false;
        this.querySelector("#start-btn").classList.remove("hidden");
    }

    /**
     * Helper function to disable the start button
     */
    disableStartButton() {
        this.querySelector("start-btn").disabled = true;
    }

    /**
     * Helper function to enable the start button
     */
    enableStartButton() {
        this.querySelector("start-btn").disabled = false;
    }

    /**
     * Get remaining time for the current state
     * @returns {number} milliseconds of remaining time
     */
    getTimeRemaining() {
        if (this.n_start_time < 0) {
            return -1;
        }
        let n_curr_time = new Date().getTime();
        let n_time_elapsed = n_curr_time - this.n_start_time;
        let n_rem_time = TimerContainer.A_STATE_DURATIONS[this.n_curr_state] - n_time_elapsed;
        // return -1 if time has passed
        return (n_rem_time >= 0 ? n_rem_time : -1);
    }

    /**
     * Re-renders all pertinent components, including updating the timer-display custom element 
     * and updating the work message
     */
    renderComponents() {
        this.querySelector("#work-message").innerText = 
            TimerContainer.A_STATE_MESSAGES[this.n_curr_state];
        this.querySelector("timer-display").setAttribute("time", this.getTimeRemaining());
        this.querySelector("timer-display").setAttribute("pomos-comp", this.n_done_pomos);
        let n_remaining_time = this.getTimeRemaining();
        if(n_remaining_time != -1) {
            document.title = TimerDisplay.formatMilliTime(Number(n_remaining_time));
        }
    }

    // State-updating components

    /**
     * Function to advance the timer state one step(e.x. work -> s/l break, breaks -> work, etc).
     * Does not perform any validation, validation must be performed before calling progressState()
     */
    progressState() {
        switch (this.n_curr_state) {
        case TimerContainer.N_WORK:
            this.querySelector("#reset-btn").disabled = true;
            let o_reset_error = this.querySelector("#reset-error");
            // handle reset error logic
            o_reset_error.innerHTML = TimerContainer.S_RESET_ERROR;
            o_reset_error.classList.add("color-error");
            ++(this.n_done_pomos);
            // go to long break after 4 pomos
            if (this.n_done_pomos == TimerContainer.N_SET) {
                this.n_curr_state = TimerContainer.N_L_BREAK;

                notify(this.n_curr_state);
                // go to short break otherwise
            } else {
                this.n_curr_state = TimerContainer.N_S_BREAK;

                notify(this.n_curr_state)
            }
            document.EventBus.fireEvent("startBreak");
            break;
        // all of these cases trigger a work session
        case TimerContainer.N_L_BREAK:
            this.n_done_pomos = 0;
        case TimerContainer.N_S_BREAK:
            document.EventBus.fireEvent("startWork");
        case TimerContainer.N_NOT_STARTED:
            this.querySelector("#reset-btn").disabled = false;
            let o_reset_error1 = this.querySelector("#reset-error");
            o_reset_error1.innerHTML = "";
            o_reset_error1.classList.remove("color-error");
            this.n_curr_state = TimerContainer.N_WORK;

            notify(this.n_curr_state);
            break;
        }
        this.n_start_time = new Date().getTime();
    }

    /**
     * Resets the current pomodoro start time. 
     * Does nothing if the current state is not a work session.
     */
    resetPomo() {
        if (this.n_curr_state == TimerContainer.N_WORK) {
            this.n_start_time = new Date().getTime();
        }
    }

    /**
     * Initializes interval to repeatedly update timer, and progresses state.
     * Does nothing if the previous state was not NOT_STARTED
     */
    beginSession() {
        if (this.n_curr_state == TimerContainer.N_NOT_STARTED) {
            // create the interval, and assign it's id to a member variable
            this.n_interval_id = setInterval(() => {
                let n_time_remaining = this.getTimeRemaining();
                if (n_time_remaining < 0) {
                    this.progressState();
                    n_time_remaining = this.getTimeRemaining();
                }
                this.renderComponents();
            }, TimerContainer.N_MILLI_DELAY);
            this.progressState();
        }
    }

    /**
     * Ends the current session, resetting all instance variables and clearing the interval
     */
    endSession() {
        // state logic for ending the session
        this.n_curr_state = TimerContainer.N_NOT_STARTED;
        this.n_start_time = -1;
        this.n_done_pomos = 0;
        clearInterval(this.n_interval_id);
        this.n_interval_id = -1;
        document.title = "Powelldoro Timer";
    }

    /**
     * Enables or disables debug mode(faster session times)
     */
    toggleDebug() {
        // Speed up timer if in debug mode
        if (!TimerContainer.B_DEBUG) {
            TimerContainer.A_STATE_DURATIONS = [3000, 3000, 3000, 0];
        } else {
            TimerContainer.A_STATE_DURATIONS = [1500000, 300000, 2100000, 0];
        }
        TimerContainer.B_DEBUG = !TimerContainer.B_DEBUG;
    }
}

/**
 * Set count
 * @static
 * @type {number}
 */
TimerContainer.N_SET = 4;

/**
* Start Pomo button message
* @static
* @type {string}
*/
TimerContainer.S_BEGIN_MESSAGE = "Start Session";

/**
 * End session button message
 * @static
 * @type {string}
 */
TimerContainer.S_END_MESSAGE = "End Session";

/**
 * Reset pomo button message
 * @static
 * @type {string}
 */
TimerContainer.S_RESET_MESSAGE = "Restart";

/**
 *
 */
TimerContainer.B_DEBUG = false;

/**
 * Enumerator for 'not started' state
 * @static
 * @type {number}
 */
TimerContainer.N_NOT_STARTED = 3;

/**
 * Enumerator for 'work' state
 * @static
 * @type {number}
 */
TimerContainer.N_WORK = 0;

/**
 * Enumerator for 'short break' state
 * @static
 * @type {number}
 */
TimerContainer.N_S_BREAK = 1;

/**
 * Enumerator for 'long break' state
 * @static
 * @type {number}
 */
TimerContainer.N_L_BREAK = 2;

/**
 * Array mapping states to their corresponding durations
 * @static
 * @type {number[]}
 */
TimerContainer.A_STATE_DURATIONS = [1500000, 300000, 2100000, 0];

/**
 * Array mapping states to their displayed messages
 * @static
 * @type {string[]}
 */
TimerContainer.A_STATE_MESSAGES = ["Pomodoro - Start working!", "Short Break - Good job!", 
    "Long Break - Relax", "Ready to focus?"];

/**
 * Delay of interval
 * @static
 * @type {number}
 */
TimerContainer.N_MILLI_DELAY = 100;

/**
 * Error message when reset button is incorrectly handled
 * @static
 * @type {String}
 */
TimerContainer.S_RESET_ERROR = "Cannot reset timer during breaks!";

customElements.define("timer-element", TimerContainer);

export { TimerContainer };
