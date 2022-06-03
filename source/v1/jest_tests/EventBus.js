export default class EventBus {
    constructor() {
        this.foo = "bar";
    }

    fireEvent(s_event_name) {
        console.log(s_event_name + " called!");
    }
}