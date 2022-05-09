import { TimerContainer } from "./timerContainer.js";

/**
 * Class representing an Event Hub to centralize all event logic
 */
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
        this.o_instructions = document.querySelector("instructions-box");
        this.registerEvents();
    }

    /**
     * Registers all of the events that will be fired
     */
    registerEvents() {
        this.registerEvent("startSession", this.handleStartSession.bind(this));
        this.registerEvent("endSession", this.handleEndSession.bind(this));
        this.registerEvent("nextTask", this.handleNextTask.bind(this));
        this.registerEvent("startBreak", this.handleStartBreak.bind(this));
        this.registerEvent("startWork", this.handleStartWork.bind(this));
        this.registerEvent("closeWindows", this.handleCloseWindows.bind(this));
        this.registerEvent("spaceKeybind", this.handleSpaceKeybind.bind(this));
        this.registerEvent("showTasks", this.handleShowTasks.bind(this));
        this.registerEvent("resetPomo", this.handleResetPomo.bind(this));
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
     * Fires the specified event
     * @param {String} s_event_name 
     */
    fireEvent(s_event_name) {
        this.o_bus.dispatchEvent(new CustomEvent(s_event_name));
    }

    /**
     * Event handler function for the 'startSession' Event
     */
    handleStartSession() {
        let o_start_error = this.o_timer_container.querySelector("#start-error");
        this.o_task_list.showTaskList();
        // check for valid application states
        if (this.o_task_list.getNumTasks() != 0 && this.o_timer_container.n_curr_state == TimerContainer.N_NOT_STARTED) {
            // hide toolbar and disable task button
            this.o_toolbar.querySelector("#task-btn").disabled = true;
            this.o_toolbar.style.visibility = "hidden";

            this.o_task_display.handleStartSession();
            this.o_timer_container.handleStartPomo();
            this.o_task_list.closeTaskList();
            this.updateTaskDisplay();
            this.handleStartWork();

            o_start_error.innerHTML = "";
            o_start_error.classList.remove("color-error");
        } else {
            o_start_error.innerHTML = EventBus.S_START_ERROR;
            o_start_error.classList.add("color-error");

            // Make error message disapper after 3 seconds
            setTimeout(() => {
                o_start_error.innerHTML = "";
                o_start_error.classList.remove("color-error");
            }, 3000);
        }
    }

    /**
     * Event handler function for the 'endSession' event
     */
    handleEndSession() {
        this.o_toolbar.querySelector("#task-btn").disabled = false;
        this.o_toolbar.style.visibility = "";
        this.o_task_display.handleEndSession();
        this.o_timer_container.handleEndSession();
    }

    /**
     * Event Handler function for the 'startWork' event
     */
    handleStartWork() {
        this.o_task_display.enableCheck();
    }

    /**
     * Event Handler function for the 'startBreak' event
     */
    handleStartBreak() {
        this.o_task_display.disableCheck();
    }

    /**
     * Event Handler function for the 'nextTask' event
     */
    handleNextTask() {
        if (this.o_timer_container.n_curr_state == TimerContainer.N_WORK) {
            this.updateTaskCompleted();
            if (this.o_task_list.getNumTasks() == 0) {
                this.handleEndSession();
            }
        }
    }

    /**
     * Event Handler function for the 'spaceKeybind' event
     */
    handleSpaceKeybind() {
        if (this.o_timer_container.n_curr_state == TimerContainer.N_NOT_STARTED) {
            this.fireEvent("startSession");
        } else {
            this.fireEvent("endSession");
        }
    }

    /**
     * Event Handler function for the 'resetPomo' event
     */
    handleResetPomo() {
        if (this.o_timer_container.n_curr_state == TimerContainer.N_WORK) {
            this.o_timer_container.resetPomo();
        }
    }

    /**
     * Event Handler function for the 'closeWindows' event
     */
    handleCloseWindows() {
        this.o_task_list.closeTaskList();
        this.o_instructions.closeInstructions();
    }

    /**
     * Event Handler function for the 'showTasks' event
     */
    handleShowTasks() {
        if (this.o_instructions.getIsShown()) {
            this.o_instructions.closeInstructions();
        }
        this.o_task_list.showTaskList();
    }

    /**
     * Helper function to pop the next task and update the taskdisplay.
     */
    updateTaskCompleted() {
        this.o_task_list.popTask();
        this.updateTaskDisplay();
    }

    /**
     * Helper function to poll the next tasks, and updates the taskdisplay accordingly
     */
    updateTaskDisplay() {
        let s_next_task = this.o_task_list.getNextTask();
        let s_next_next_task = this.o_task_list.getNextNextTask();
        let n_num_tasks = Math.min(this.o_task_list.getNumTasks(), 2);
        this.o_task_display.setAttribute("currtask", s_next_task);
        this.o_task_display.setAttribute("nexttask", s_next_next_task);
        this.o_task_display.setAttribute("numtasks", n_num_tasks);
    }
}
/**
 * Error message when Start button is incorrectly handled
 * @static
 * @type {String}
 */
EventBus.S_START_ERROR = "Cannot start session with no tasks!";

export { EventBus };