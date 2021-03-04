class EventBus {
    constructor() {
        this.o_div = document.createElement("div");
        this.o_task_list = document.querySelector("task-list");
        this.o_timer_container = document.querySelector("timer-container");
        this.o_task_display = document.querySelector("task-display");
        this.o_toolbar = document.querySelector("nav");

        this.o_task_list.addEventListener("fetchTask", (details) => { })
    }

}


/**
 * 
 */
export { EventBus };