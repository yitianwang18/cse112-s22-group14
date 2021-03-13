import { Task } from "./task.js";
import { TaskList } from "./taskList.js";
import { TimerContainer } from "./timerContainer.js";

/**
 * Custom HTML element encapsulating the display of current and next task during a pomo
 * @extends HTMLElement
 */

export default class TaskDisplay extends HTMLElement {

    /**
     * Attributes that this object observes
     * @static
     * @type {String[]}
     */
    static get observedAttributes() { return ["currtask", "nexttask", "numtasks"]; }

    /**
     * Constructor. Initializes task display.
     */
    constructor() {
        super();
        //wrapper div
        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "middle-container";

        //current header
        let o_curr_title = document.createElement("h3");
        o_curr_title.innerText = "Current Task:";

        //div for box displaying current
        let o_curr_disp = document.createElement("div");
        o_curr_disp.id = "current";
        o_curr_disp.innerHTML = "Do this";

        let o_wrap_btn = document.createElement("span");
        o_wrap_btn.id = "wrap-check-btn";
        o_wrap_btn.className = "btn-wrapper";

        //check button
        let o_check_btn = document.createElement("button");
        o_check_btn.className = "btn";
        o_check_btn.id = "check";
        o_check_btn.title = "Task completed";

        let o_next_btn = document.createElement("i");
        o_next_btn.classList.add("fas", "fa-check-circle", "fa-x", "tool");

        let o_error_mssg = document.createElement("span");
        o_error_mssg.id = "check-error";
        o_error_mssg.className = "error-mssg";
        o_error_mssg.innerHTML = TaskDisplay.CHECK_ERROR;

        let f_handle_check = () => { document.EventBus.fireEvent("nextTask") };
        o_check_btn.addEventListener("click", f_handle_check);
        o_check_btn.append(o_next_btn);

        o_wrap_btn.append(o_check_btn, o_error_mssg);

        //header for next task
        let o_next_title = document.createElement("h3");
        o_next_title.innerText = "Next Task";

        //div for box displaying next
        let o_next_disp = document.createElement("div");
        o_next_disp.id = "next";

        o_wrapper_obj.append(o_curr_title, o_curr_disp, o_wrap_btn, o_next_title, o_next_disp);
        this.append(o_wrapper_obj);

        /*keeps track of the number of tasks*/
        this.setAttribute("numtasks", 0);

        /*keeps track of current and next task*/
        this.setAttribute("currtask", -1);
        this.setAttribute("nexttask", -1);

        this.handleEndSession();
    }

    /**
     * Handler for when attributes are changed
     * @param {String} name name of changed attribute
     * @param {*} oldValue old value of attribute
     * @param {*} newValue new value of attribute
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "numtasks" && newValue <= 1) {
            this.querySelector("#next").style.display = "none";
            this.getElementsByTagName("h3")[1].style.display = "none";
        }
        else if (name == "numtasks" && newValue > 1) {
            this.querySelector("#next").style.display = "";
            this.getElementsByTagName("h3")[1].style.display = "";
        }
        else if (name == "currtask") {
            this.querySelector("#current").innerText = newValue;
        }
        else if (name == "nexttask") {
            this.querySelector("#next").innerText = newValue;
        }
    }

    // /**
    //  * Finishes display at end of session.
    //  * @param {Event} o_event event instance
    //  */
    // endDisp(o_event) {
    //     this.querySelector("#current").innerHTML = "All tasks for this session completed!";
    //     this.querySelector("#next").innerHTML = "All tasks for this session completed!";
    //     this.o_tasks = {};
    //     this.tasksComplete();
    // }

    // /**
    //  * Initializes display on session start.
    //  * @param {object} o_event click event
    //  */
    // startDisp(o_event) {
    //     this.updateList();
    // }

    // /**
    //  * Handles pressing the check button.
    //  * @param {Event} o_event event instance
    //  */
    // pressCheck(o_event) {
    //     //checks edge cases
    //     if (this.o_tasks == undefined || Object.values(this.o_tasks).length == 0
    //         || document.querySelector("timer-element").n_curr_state !== 0) {
    //         return;
    //     }

    //     //removes task   
    //     document.querySelector("task-list").removeItem(this.n_curr_taskid);
    //     delete this.o_tasks[this.n_curr_taskid];
    //     this.setAttribute("numtasks", this.o_tasks.length);
    //     this.updateDisp();
    // }

    /**
     * Helper function called from parent component to disable button during breaks.
     * 
     */
    disableCheck() {
        this.querySelector("#check").disabled = true;
        let o_check_error = this.querySelector("#check-error");
        o_check_error.title = "";
        o_check_error.classList.add("color-error");
    }

    /**
     * Helper function called from parent component to enable button.
     * 
     */
    enableCheck() {
        this.querySelector("#check").disabled = false;
        this.querySelector("#check-error").title = TaskDisplay.CHECK_TOOLTIP;
        this.querySelector("#check-error").classList.remove("color-error");
    }

    // /**
    //  * Helper function called from parent component to hide display.
    //  * 
    //  */
    // hideDisp() {
    //     document.getElementsByClassName("middle-container").style.display = "none";
    // }

    // /**
    //  * Helper function called from parent component to show display.
    //  * 
    //  */
    // showDisp() {
    //     document.getElementsByClassName("middle-container").style.display = "";
    // }

    /**
     * Mimics end of session functionality when all tasks are completed.
     */
    // tasksComplete() {
    //     let o_vals = new Array(Object.values(this.o_tasks));
    //     //no tasks left, so it displays finish
    //     if (o_vals[0].length == 0) {
    //         this.querySelector("#current").innerHTML = "All tasks for this session completed!";
    //         this.querySelector("#next").innerHTML = "All tasks for this session completed!";
    //         this.querySelector("#next").style.display = "none";
    //         // document.querySelector("timer-element").endSession();
    //         // document.querySelector("timer-element").renderComponents();
    //         // document.querySelector("#reset-btn").classList.add("hidden");
    //         // document.querySelector("#reset-btn").disabled = false;
    //         // document.querySelector("#start-btn").classList.remove("hidden");
    //         // document.querySelector("#task-btn").disabled = false;
    //         this.setAttribute("currtask", -1);
    //         this.setAttribute("nexttask", -1);
    //         this.setAttribute("numtasks", 0);
    //     }
    // }

    /**
     * Updates display for current and next task (from task list).
     */
    // updateDisp() {
    //     let b_curr = false;
    //     let b_next = false;

    //     //iterate through tasks and find first two valid tasks to display
    //     for (const [key, value] of Object.entries(this.o_tasks)) {
    //         if (!b_curr && this.o_tasks[key] != undefined) {
    //             this.querySelector("#current").innerHTML = value;
    //             b_curr = true;
    //             this.n_curr_taskid = key;
    //             this.setAttribute("currtask", key);
    //         }
    //         else if (b_next == false && this.o_tasks[key] != undefined) {
    //             this.n_next_taskid = key;
    //             this.querySelector("#next").innerHTML = value;
    //             b_next = true;
    //             this.setAttribute("nexttask", key);
    //             return;
    //         }
    //     }
    //     //if bools are false and exits loop, there are no tasks to fill next or current
    //     if (!b_curr) {
    //         this.tasksComplete();
    //     }

    //     else if (!b_next) {
    //         this.querySelector("#next").innerHTML = "No more tasks for this session!";
    //         this.querySelector("#next").style.display = "none";
    //     }
    // }

    // /**
    //  * Updates the list of tasks to match taskList at start of session. 
    //  */
    // updateList() {
    //     let temp = document.querySelector("task-list").o_tasks;
    //     this.o_tasks = temp;
    //     this.setAttribute("numtasks", this.o_tasks.length);
    //     this.updateDisp();
    //     //hides next task if no next available
    //     if (this.o_tasks.length <= 1) {
    //         this.querySelector("#next").style.display = "none";
    //     }
    //     else if (this.o_tasks.length >= 2) {
    //         this.querySelector("#next").style.display = "";
    //     }
    // }

    handleEndSession() {
        this.querySelector(".middle-container").style.display = "none";
    }

    handleStartSession() {
        this.querySelector(".middle-container").style.display = "block";
    }
}

/**
 * Tooltip when check button is hovered upon
 * @static
 * @type {String}
 */
TaskDisplay.CHECK_TOOLTIP = "Task completed!";

/**
 * Error message when check button is incorrectly handled
 * @static
 * @type {String}
 */
 TaskDisplay.CHECK_ERROR = "Tasks cannot be checked off during breaks!";

customElements.define("task-display", TaskDisplay);


export { TaskDisplay }