class Timer {
    static states = ['work', 'sbreak', 'lbreak'];
    // 25 min, 5 min, 35 min in milliseconds
    static stateDurations = [1500000, 300000, 2100000]

    /* For the timer, don't add numbers seperated by timeouts(as timeouts aren't perfect). Use the system
       millisecond time, and 60fps timeout */
    constructor() {

    }

    /* goes to the next state(work -> sbreak, sbreak -> work, etc) */
    progressState = () => {

    }

    /* remaining time for this current work/sbreak/lbreak */
    getTimeRemaining = () => {

    }

    /* renders timer, buttons, tomatos based on current state */
    /* use internal state to check it */
    render = () => {

    }

    resetPomo = () => {

    }

    beginSession = () => {

    }

    endSession = () => {

    }
}