import { Task } from "./task.js";

/**
 * Custom HTML element encapsulating all of the functionality related to the Task List
 * @extends HTMLElement
 */
class TaskList extends HTMLElement {

    /**
     * Maximum length of trimmed input task
     * @static
     * @type {Number}
     */
    static N_MAX_TASK_LENGTH = 50;

    /**
     * Key code of Enter Key
     * @static
     * @type {Number}
     */
    static N_ENTER_KEYCODE = 13;

    o_tasks = {};
    n_next_task_id = 0;

    /**
     * Constructs a new Timer Display, initializing all elements and adding handlers
     */
    constructor() {
        super();

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "sidenav";
        o_wrapper_obj.id = "side-tasks";

        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close", "btn");
        o_close_button.innerHTML = "&times;";

        let o_task_title_wrapper = document.createElement("div");
        o_task_title_wrapper.id = "task-title";


        let o_tasklist_title = document.createElement("h1");
        o_tasklist_title.innerText = "TaskList";

        let o_add_task = document.createElement("div");
        o_add_task.id = "add-task";

        let o_add_task_input = document.createElement("input");
        o_add_task_input.type = "text";
        o_add_task_input.name = "task";
        o_add_task_input.placeholder = "Enter task description";
        o_add_task_input.required = true;
        o_add_task_input.addEventListener("keyup", this.handleKeyUpChange.bind(this));
        o_add_task_input.addEventListener("input", this.handleInputChange.bind(this));

        let o_add_task_icon = document.createElement("i");
        o_add_task_icon.id = 'add-btn';
        o_add_task_icon.classList.add("fas", "fa-plus-square", "fa-2x", "btn");
        o_add_task_icon.addEventListener("click", this.handleAddTask.bind(this));

        o_add_task.append(o_add_task_input, o_add_task_icon);

        let o_hr = document.createElement("hr");

        let o_existing_tasks_title = document.createElement("div")
        o_existing_tasks_title.innerHTML = "Tasks to finish:";

        o_task_title_wrapper.append(o_tasklist_title, o_add_task, o_hr, o_existing_tasks_title);

        let o_tasks = document.createElement("div");
        o_tasks.id = "all-tasks";

        o_wrapper_obj.append(o_close_button, o_task_title_wrapper, o_tasks);
        this.append(o_wrapper_obj);

        // update the + icon, as it's by default not initialized
        this.handleInputChange(undefined);
    }

    /**
     * Static helper function to validate an input string with given parameters
     * @param {String} s_input string to validate
     */
    static validateString(s_input) {
        s_input = s_input.trim();
        if (s_input.length == 0 || s_input.length > TaskList.N_MAX_TASK_LENGTH) {
            return false;
        }
        return true;
    }

    /**
     * Handles the input change event. Only used for disabling/enabling the task add button
     * @param {Event} o_event event instance
     */
    handleInputChange(o_event) {
        if (o_event == undefined || !TaskList.validateString(o_event.target.value)) {
            this.querySelector("#add-btn").setAttribute("invalid", true);
        } else {
            this.querySelector("#add-btn").setAttribute("invalid", false);
        }
    }

    /**
     * Handles the Key-up event for task input. Only used for checking when enter is pressed
     * @param {Event} o_event event instance
     */
    handleKeyUpChange(o_event) {
        if (o_event.keyCode == TaskList.N_ENTER_KEYCODE) {
            this.handleAddTask();
        }
    }

    /**
     * Handles the event for adding a task. o_event should be useless as you don't care about the object that was clicked.
     * Validates the string, and if it's valid, it updates the data structure and adds a Task to the DOM
     * @param {Event} o_event event instance
     */
    handleAddTask(o_event) {
        let o_input = this.querySelector("input[name=task]");
        let s_task_name = o_input.value.trim();

        if (TaskList.validateString(s_task_name)) {
            this.addItem(s_task_name);
            this.clearInput();
        }
    }

    clearInput() {
        let o_input = this.querySelector("input[name=task]");
        o_input.value = "";
    }

    /**
     * Returns the task data structure
     * @returns {Object} Dictionary mapping taskid to taskname
     */
    getItems() {
        return this.o_tasks;
    }

    /**
     * Adds an item to the task list, and also adds it to the dom
     * @param {Stromg} s_task_name name of the task
     */
    addItem(s_task_name) {
        let n_task_id = this.n_next_task_id++;
        this.o_tasks[n_task_id] = s_task_name;
        let o_task = new Task();
        o_task.setAttribute("taskname", s_task_name);
        o_task.setAttribute("taskid", n_task_id);
        o_task.bindHandleDelete(() => { console.log(this); this.removeItem(n_task_id) });
        this.querySelector("#all-tasks").append(o_task);
    }

    /**
     * Removes a specific task from the task list(from dom and data structure)
     * @param {Number} n_task_id id of task to remove
     */
    removeItem(n_task_id) {
        if (this.o_tasks[n_task_id] == undefined) {
            return -1;
        }
        let item = this.o_tasks[n_task_id];
        delete this.o_tasks[n_task_id];

        // attribute query selector
        this.querySelector(`#all-tasks task-item[taskid='${n_task_id}']`).remove();

        return item;
    }

}
customElements.define("task-list", TaskList);


export { TaskList }
