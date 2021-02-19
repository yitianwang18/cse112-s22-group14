import { TimerDisplay } from "./timer.js";
/**
 * Custom HTML element for a TimerContainer, including the display and functionality
 * @extends HTMLElement
 */
class TimerContainer extends HTMLElement {
    /**
     * Start Pomo button message
     * @static
     * @type {string}
     */
    static S_BEGIN_MESSAGE = "Start Pomo!";

    /**
     * End session button message
     * @static
     * @type {string}
     */
    static S_END_MESSAGE = "End Session";

    /**
     * Reset pomo button message
     * @static
     * @type {string}
     */
    static S_RESET_MESSAGE = "Reset Pomo!";

    /**
     * Target selector of the "i" button
     * @static
     * @type {string}
     */
    static S_INSTRUCTIONS_TARGET = ".instructions-section";

    static DEBUG = true;

    /**
     * Enumerator for 'not started' state
     * @static
     * @type {number}
     */
    static NOT_STARTED = 3;

    /**
     * Enumerator for 'work' state
     * @static
     * @type {number}
     */
    static WORK = 0;

    /**
     * Enumerator for 'short break' state
     * @static
     * @type {number}
     */
    static S_BREAK = 1;

    /**
     * Enumerator for 'long break' state
     * @static
     * @type {number}
     */
    static L_BREAK = 2;

    /**
     * Array mapping states to their corresponding durations
     * @static
     * @type {number[]}
     */
    static A_STATE_DURATIONS = [1500000, 300000, 2100000, 0];

    /**
     * Array mapping states to their displayed messages
     * @static
     * @type {string[]}
     */
    static A_STATE_MESSAGES = ["Start working!", "Take a quick break!", "Take a long break!", "Ready to focus?"];

    /**
     * Delay of interval
     * @static
     * @type {number}
     */
    static N_MILLI_DELAY = 100;

    n_start_time;
    n_curr_state;
    n_done_pomos;
    n_interval_id;

    /**
     * Constructs a new Timer Container, initializes elements, and assigns event listeners
     */
    constructor() {
        super();
        // Speed up timer if in debug mode
        if (TimerContainer.DEBUG) {
            TimerContainer.A_STATE_DURATIONS = [3000, 3000, 3000, 0];
        }
        let o_wrapper = document.createElement("div");
        o_wrapper.className = "timer-box";

        let o_work_message = document.createElement("h1");
        o_work_message.id = "work-message";

        let o_timer_display = new TimerDisplay();
        o_timer_display.setAttribute("time", 0);
        o_timer_display.setAttribute("pomos-comp", 0);

        let o_start_btn = document.createElement("button");
        o_start_btn.id = "start-btn";
        o_start_btn.className = "custom-btn";
        o_start_btn.innerText = TimerContainer.S_BEGIN_MESSAGE;
        o_start_btn.addEventListener("click", this.handleStartPomo.bind(this));

        let o_reset_btn = document.createElement("button");
        o_reset_btn.id = "reset-btn";
        o_reset_btn.classList.add("custom-btn", "hidden");
        o_reset_btn.innerText = TimerContainer.S_RESET_MESSAGE;
        o_reset_btn.addEventListener("click", this.handleResetPomo.bind(this))

        let o_end_btn = document.createElement("button");
        o_end_btn.id = "end-btn";
        o_end_btn.className = "custom-btn";
        o_end_btn.innerText = TimerContainer.S_END_MESSAGE;
        o_end_btn.addEventListener("click", this.handleEndSession.bind(this));

        // shortcut to instructions
        // let o_information = document.createElement("button");
        // o_information.className = "info-btn";
        // o_information.innerText = "i";
        // o_information.setAttribute("target", TimerContainer.S_INSTRUCTIONS_TARGET);
        // o_information.addEventListener("click", this.handleInfoBtnPressed.bind(this));
        //

        // shortcut to instructions
        let o_information = document.createElement("i");
        o_information.className = "info-btn fas fa-info-circle fa-2x";
        // o_information.innerText = "";
        o_information.setAttribute("target", TimerContainer.S_INSTRUCTIONS_TARGET);
        o_information.addEventListener("click", this.handleInfoBtnPressed.bind(this));

        o_wrapper.append(o_information, o_work_message, o_timer_display, o_start_btn, o_reset_btn, o_end_btn);

        this.append(o_wrapper);

        // initialize state variables
        this.n_start_time = -1;
        this.n_curr_state = TimerContainer.NOT_STARTED;
        this.n_done_pomos = 0;
        this.n_interval_id = -1;

        this.renderComponents();
    }

    /**
     * Event handler function for when the "start session" button is pressed
     * @param {Event} o_event The event instance
     */
    handleStartPomo(o_event) {
        this.beginSession();
        this.querySelector("#reset-btn").classList.remove("hidden");
        this.querySelector("#start-btn").classList.add("hidden");
        this.renderComponents();
    }

    // Event Handlers

    /**
     * Event handler function for when the "reset pomo" button is pressed
     * @param {Event} o_event The event instance
     */
    handleResetPomo(o_event) {
        this.resetPomo();
        this.renderComponents();
    }

    /**
     * Event handler function for when the "end session" button is pressed
     * @param {Event} o_event The event instance
     */
    handleEndSession(o_event) {
        this.endSession();
        this.renderComponents();
        this.querySelector("#reset-btn").classList.add("hidden");
        this.querySelector("#reset-btn").disabled = false;
        this.querySelector("#start-btn").classList.remove("hidden");
    }

    /**
     * Event handler function for when the "info" button is pressed
     * @param {Event} o_event The event instance
     */
    handleInfoBtnPressed(o_event) {
        let o_target = o_event.target.getAttribute("target");
        let n_offset = document.querySelector(o_target).offsetTop;

        scroll({ top: n_offset, behavior: "smooth" });
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
        return n_rem_time;
    }

    /**
     * Re-renders all pertinent components, including updating the timer-display custom element and updating
     * the work message
     */
    renderComponents() {
        this.querySelector("#work-message").innerText = TimerContainer.A_STATE_MESSAGES[this.n_curr_state];
        this.querySelector("timer-display").setAttribute("time", this.getTimeRemaining());
        this.querySelector("timer-display").setAttribute("pomos-comp", this.n_done_pomos);
    }

    // State-updating components

    /**
     * Function to advance the timer state one step(e.x. work -> s/l break, breaks -> work, etc).
     * Does not perform any validation, validation must be performed before calling progressState()
     */
    progressState() {
        switch (this.n_curr_state) {
            case TimerContainer.WORK:
                this.querySelector("#reset-btn").disabled = true;
                ++(this.n_done_pomos);
                if (this.n_done_pomos == 4) {
                    this.n_curr_state = TimerContainer.L_BREAK;
                } else {
                    this.n_curr_state = TimerContainer.S_BREAK;
                }
                break;
            case TimerContainer.L_BREAK:
                this.n_done_pomos = 0;
            case TimerContainer.S_BREAK:
            case TimerContainer.NOT_STARTED:
                this.querySelector("#reset-btn").disabled = false;
                this.n_curr_state = TimerContainer.WORK;
                break;

        }
        this.n_start_time = new Date().getTime();
    }

    /**
     * Resets the current pomodoro start time. Does nothing if the current state is not a work session.
     */
    resetPomo() {
        if (this.n_curr_state == TimerContainer.WORK) {
            this.n_start_time = new Date().getTime();
        }
    }

    /**
     * Initializes interval to repeatedly update timer, and progresses state.
     * Does nothing if the previous state was not NOT_STARTED
     */
    beginSession() {
        if (this.n_curr_state == TimerContainer.NOT_STARTED) {
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
        this.n_curr_state = TimerContainer.NOT_STARTED;
        this.n_start_time = -1;
        this.n_done_pomos = 0;
        clearInterval(this.n_interval_id);
        this.n_interval_id = -1;
    }
}
customElements.define("timer-element", TimerContainer);

// commonjs
// if (typeof exports !== 'undefined') {
//     module.exports = { TimerContainer };
// }

export { TimerContainer };