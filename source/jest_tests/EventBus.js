/**
 * Stub EventBus class used for testing. Currently only used for timerContainer
 * Jest test.
 */
export default class EventBus {
    constructor() {
        this.foo = "bar";
    }

    fireEvent(s_event_name) {
        console.log(s_event_name + " called!");
    }
}