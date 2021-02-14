class Timer {
    static NOT_STARTED = 3;
    static WORK = 0;
    static S_BREAK = 1;
    static L_BREAK = 2;

    static A_STATE_DURATIONS = [1500000, 300000, 2100000, 0];

    static N_MILLI_DELAY = 250;

    n_start_time;
    n_curr_state;
    s_time_remaining;
    n_done_pomos;
    n_interval_id;

    /* For the timer, don't add numbers seperated by timeouts(as timeouts aren't perfect). Use the system
       millisecond time, and 60fps timeout */
    constructor() {
        this.n_start_time = 0;
        this.n_curr_state = Timer.NOT_STARTED;
        this.n_done_pomos = 0;
        this.n_interval_id = -1;

        this.renderComponents(Timer.A_STATE_DURATIONS[Timer.WORK]);
    }

    static padZeroes(n_time, n_desired_length) {
        let s_output = String(n_time);
        while (s_output.length < n_desired_length) {
            s_output = "0" + s_output;
        }
        return s_output;
    }
    static formatMilliTime(n_milli_time) {
        let o_date = new Date(n_milli_time + 500);
        let s_minutes = this.padZeroes(o_date.getMinutes(), 2);
        let s_seconds = this.padZeroes(o_date.getSeconds(), 2);
        return `${s_minutes}:${s_seconds}`;
    }

    /* goes to the next state(work -> sbreak, sbreak -> work, etc) */
    progressState() {
        if (this.n_curr_state == Timer.WORK) {
            ++(this.n_done_pomos);
            if (this.n_done_pomos == 4) {
                this.n_curr_state = Timer.L_BREAK;
            } else {
                this.n_curr_state = Timer.S_BREAK;
            }
        } else {
            if (this.n_curr_state == Timer.L_BREAK) {
                this.n_done_pomos = 0;
            }
            this.n_curr_state = Timer.WORK;
        }
        this.n_start_time = new Date().getTime();
    } /* progressState */

    /* remaining time for this current work/sbreak/lbreak */
    getTimeRemaining() {
        let n_curr_time = new Date().getTime();
        let n_time_elapsed = n_curr_time - this.n_start_time;
        let n_rem_time = Timer.A_STATE_DURATIONS[this.n_curr_state] - n_time_elapsed;
        return n_rem_time;
    }

    /* renders timer, buttons, tomatos based on current state */
    /* use internal state to check it */
    renderComponents(n_time_remaining) {
        document.querySelector("#time-display").innerHTML = Timer.formatMilliTime(n_time_remaining);
        for (let n_pomo_index = 1; n_pomo_index <= 4; n_pomo_index++) {
            let s_pomo_done = (n_pomo_index <= this.n_done_pomos) ? "Yes" : "No";
            document.querySelector(`#pomo${n_pomo_index}`).setAttribute("src", `assets/img/PomoCount${s_pomo_done}.png`);
        }
    }

    resetPomo() {
        let n_curr_time = new Date().getTime();
        this.n_curr_state = WORK;
        this.n_start_time = new Date().getTime();
    }

    beginSession() {
        this.n_interval_id = setInterval(() => {
            let n_time_remaining = this.getTimeRemaining();
            if (n_time_remaining < 0) {
                this.progressState();
                n_time_remaining = this.getTimeRemaining();
            }
            this.renderComponents(n_time_remaining);
        }, Timer.N_MILLI_DELAY);
        this.progressState();
    }

    endSession() {
        //let n_curr_state = Timer.NOT_STARTED;
        let n_end_time = new Date().getTime();
        this.progressState();
    }
}


if (typeof module !== 'undefined') {
    module.exports = { Timer };
}