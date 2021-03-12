class EventBus {

    /**
     * Constructs a new EventBus, by obtaining references to all major webcomponents
     * and registering events
     */
    constructor() {
        this.o_bus = document.createElement("div");
        this.o_task_list = document.querySelector("task-list");
        this.o_timer_container = document.querySelector("timer-element");
        this.o_task_display = document.querySelector("task-display");
        this.o_toolbar = document.querySelector("nav");

        this.registerEvent("startSession", this.handleStartSession.bind(this));
        this.registerEvent("endSession", this.handleEndSession.bind(this));
        this.registerEvent("nextTask", this.handleNextTask.bind(this));
        this.registerEvent("fetchTask", this.updateTaskDisplay.bind(this));
        this.registerEvent("startBreak", this.handleStartBreak.bind(this));
        this.registerEvent("startWork", this.handleStartWork.bind(this));

    }

    /**
     * Registers the event of the specified name
     * @param {String} s_event_name name to fire off
     * @param {Function} f_callback callback function to call
     */
    registerEvent(s_event_name, f_callback) {
        this.o_bus.addEventListener(s_event_name, f_callback);
    }

    /**
     * Fires 
     * @param {*} s_event_name 
     */
    fireEvent(s_event_name) {
        this.o_bus.dispatchEvent(new CustomEvent(s_event_name));
    }

    handleStartSession() {
        let o_start_error = this.o_timer_container.querySelector("#start-error");
        if (this.o_task_list.getNumTasks() != 0) {
            this.o_toolbar.querySelector("#task-btn").disabled = true;
            // hide toolbar
            this.o_toolbar.style.visibility = "hidden";

            this.o_task_display.handleStartSession();
            this.updateTaskDisplay();
            this.o_timer_container.handleStartPomo();
            this.o_task_list.closeTaskList();
            this.handleStartWork();

            o_start_error.innerHTML = "";
            o_start_error.classList.remove("color-error");
        } else { 
            o_start_error.innerHTML = EventBus.START_ERROR;
            o_start_error.classList.add("color-error");

            // Make error message disapper after 3 seconds
            setTimeout(() => {
                o_start_error.innerHTML = "";
                o_start_error.classList.remove("color-error");
            }, 3000);
        }
    }

    handleEndSession() {
        this.o_toolbar.querySelector("#task-btn").disabled = false;
        this.o_toolbar.style.visibility = "";
        this.o_task_display.handleEndSession();
        this.o_timer_container.handleEndSession();
    }

    handleStartWork() {
        this.o_task_display.enableCheck();
    }

    handleStartBreak() {
        this.o_task_display.disableCheck();
    }

    handleNextTask() {
        this.updateTaskCompleted();
        if (this.o_task_list.getNumTasks() == 0) {
            this.handleEndSession();
        }
    }

    updateTaskDisplay() {
        let s_next_task = this.o_task_list.getNextTask();
        let s_next_next_task = this.o_task_list.getNextNextTask();
        let n_num_tasks = Math.min(this.o_task_list.getNumTasks(), 2);
        this.o_task_display.setAttribute("currtask", s_next_task);
        this.o_task_display.setAttribute("nexttask", s_next_next_task);
        this.o_task_display.setAttribute("numtasks", n_num_tasks);
    }

    updateTaskCompleted() {
        this.o_task_list.popTask();
        this.updateTaskDisplay();
    }

}

/**
 * Error message when Start button is incorrectly handled
 * @static
 * @type {String}
 */
EventBus.START_ERROR = "Cannot start session with no tasks!";

export { EventBus };