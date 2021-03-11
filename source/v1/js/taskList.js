import { Task } from "./task.js";
//import { TaskDisplay } from "./taskDisplay.js";

/**
 * Custom HTML element encapsulating all of the functionality related to the Task List
 * @extends HTMLElement
 */
class TaskList extends HTMLElement {
    /**
     * Constructs a new Timer Display, initializing all elements and adding handlers
     */
    constructor() {
        super();
        this.o_tasks = {};
        this.n_next_task_id = 0;

        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.className = "sidenav-blocker";
        o_wrapper_obj_back.id = "side-tasks-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeTaskList.bind(this));

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "sidenav";
        o_wrapper_obj.id = "side-tasks";

        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close", "btn");
        o_close_button.id = "close-task";
        o_close_button.innerHTML = "&times;";
        o_close_button.addEventListener("click", this.closeTaskList.bind(this));

        let o_task_title_wrapper = document.createElement("div");
        o_task_title_wrapper.id = "task-title";


        let o_tasklist_title = document.createElement("h1");
        o_tasklist_title.innerText = "TaskList";

        let o_add_task = document.createElement("div");
        o_add_task.id = "add-task";

        let o_add_label_container = document.createElement("div")
        
        let o_make_add_label_bold = document.createElement("strong");
        o_make_add_label_bold.innerHTML = "Add task:";

        o_add_label_container.append(o_make_add_label_bold);

        // add input field
        let o_add_task_input = document.createElement("input");
        o_add_task_input.id = "task-input";
        o_add_task_input.type = "text";
        o_add_task_input.name = "task";
        o_add_task_input.placeholder = "Enter task description";
        o_add_task_input.addEventListener("keyup", this.handleKeyUpChange.bind(this));
        o_add_task_input.addEventListener("input", this.handleInputChange.bind(this));

        // creating add button
        let o_wrap_btn = document.createElement("span");
        o_wrap_btn.id = "wrap-add-btn";
        o_wrap_btn.className = "btn-wrapper";

        let o_add_task_button = document.createElement("button");
        o_add_task_button.classList.add("btn");
        o_add_task_button.id = "add-btn";

        let o_add_task_icon = document.createElement("i");
        o_add_task_icon.classList.add("fas", "fa-plus-square", "fa-x");
        o_add_task_button.appendChild(o_add_task_icon);

        let o_error_mssg = document.createElement("span");
        o_error_mssg.id = "add-error";
        o_error_mssg.className = "error-mssg";

        o_wrap_btn.append(o_add_task_button, o_error_mssg);

        o_add_task_button.addEventListener("click", this.handleAddTask.bind(this));

        o_add_task.append(o_add_task_input, o_wrap_btn);

        let o_hr = document.createElement("hr");

        let o_existing_tasks_title = document.createElement("div")
        
        let o_make_bold = document.createElement("strong");
        o_make_bold.innerHTML = "Tasks remaining:";

        o_existing_tasks_title.append(o_make_bold);

        let o_error_mssg_2 = document.createElement("span");
        o_error_mssg_2.id = "edit-error";
        o_error_mssg_2.className = "error-mssg";

        o_task_title_wrapper.append(o_tasklist_title, o_add_label_container, o_add_task, o_hr, o_existing_tasks_title, o_error_mssg_2);

        let o_tasks = document.createElement("div");
        o_tasks.id = "all-tasks";

        o_wrapper_obj.append(o_close_button, o_task_title_wrapper, o_tasks);
        this.append(o_wrapper_obj_back);
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
            this.querySelector("#add-btn").disabled = true;
            this.querySelector("#add-error").innerHTML = TaskList.TASK_ERROR;
            this.querySelector("#add-error").style.backgroundColor = "#ffcdd2";
            this.querySelector("#add-error").style.color = "#f44336";
        } else {
            this.querySelector("#add-btn").disabled = false;
            this.querySelector("#add-error").innerHTML = "";
            this.querySelector("#add-error").style.backgroundColor = "#0000";
            this.querySelector("#add-error").style.color = "#0000";
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
            this.handleInputChange(undefined);
        }
    }

    /**
     * Clears the task input field
     */
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
        o_task.bindHandleDelete(() => { this.removeItem(n_task_id) });
        o_task.bindHandleEdit(() => { this.editItemName(n_task_id); });
        // bind a function that listen to an onchange for a task input element

        this.querySelector("#all-tasks").append(o_task);
    }

    /**
     * Enter 'edit task name' mode after clicking on existing task
     * @param {number} n_task_id task id number
     */
    editItemName(n_task_id) {
        // get the task object that we'll be editing the name of
        let o_task_item = this.querySelector(`#all-tasks task-item[taskid='${n_task_id}']`);
        let o_task_item_input = o_task_item.querySelector('input');
        let s_curr_input_val = o_task_item.getAttribute('taskname');
        let o_error_span = this.querySelector("#edit-error");
        if (TaskList.validateString(o_task_item_input.value)) {
            o_task_item.setAttribute('taskname', o_task_item_input.value.trim());
            o_error_span.innerHTML = "";
            o_error_span.style.backgroundColor = "#0000";
            o_error_span.style.color = "#0000";
        }
        else {
            o_task_item.setAttribute('taskname', s_curr_input_val);
            o_error_span.innerHTML = TaskList.TASK_ERROR;
            o_error_span.style.backgroundColor = "#ffcdd2";
            o_error_span.style.color = "#f44336";

            setTimeout(() => {
              o_error_span.innerHTML = "";
              o_error_span.style.backgroundColor = "#0000";
              o_error_span.style.color = "#0000";
            }, 3000);
        }
        // this.editTaskName()
        // update array of tasks (o_tasks)
        this.o_tasks[n_task_id] = o_task_item.getAttribute('taskname');
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

    /**
     * Function to show task list display from the main user screen
     */
    showTaskList() {
        this.querySelector("#close-task").style.display = "block";
        let o_tasks = this.querySelector("#side-tasks");
        o_tasks.style.width = "420px";
        if (window.screen.width <= 500) {
          o_tasks.style.padding = "0 10%";
        } else {
          o_tasks.style.padding = "0 50px";
        }
        setTimeout(() => {
          this.querySelector("#task-title").style.display = "block";
          this.querySelector("#all-tasks").style.display = "block";
        }, 200);
        let o_tasks_back = this.querySelector("#side-tasks-blocker");
        o_tasks_back.style.display = "block";
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeTaskList() {
        this.querySelector("#close-task").style.display = "none";
        let o_tasks = this.querySelector("#side-tasks");
        o_tasks.style.width = "0";
        o_tasks.style.padding = "0";
        this.querySelector("#task-title").style.display = "none";
        this.querySelector("#all-tasks").style.display = "none";
        let o_tasks_back = this.querySelector("#side-tasks-blocker");
        o_tasks_back.style.display = "none";
    }

    /**
     * Function to return number of tasks
     */
    getNumTasks() {
        return Object.keys(this.o_tasks).length;
    }

    /**
     * Function to return the next task in the taskList
     */
    getNextTask() {
        if (this.getNumTasks() == 0) {
            return undefined;
        }
        return this.o_tasks[Object.keys(this.o_tasks)[0]];
    }

    /**
     * Function to return the next-next task in taskList
     */
    getNextNextTask() {
        if (this.getNumTasks() <= 1) {
            return undefined;
        }
        return this.o_tasks[Object.keys(this.o_tasks)[1]];
    }

    /**
     * Function to remove current task in taskList
     */
    popTask() {
        if (this.getNumTasks() >= 1) {
            this.removeItem(Object.keys(this.o_tasks)[0]);
        }
    }

    /**
     * Function to execute all actions for when the session
     * has begun
     */
    handleStartSession() {
        this.closeTaskList();
    }

}
/**
 * Maximum length of trimmed input task
 * @static
 * @type {Number}
 */
TaskList.N_MAX_TASK_LENGTH = 50;

/**
 * Key code of Enter Key
 * @static
 * @type {Number}
 */
TaskList.N_ENTER_KEYCODE = 13;

/**
 * Error message for adding or editing task incorrectly
 * @static
 * @type {String}
 */
TaskList.TASK_ERROR = "Input cannot be empty or be more than 50 chars long!";

customElements.define("task-list", TaskList);


export { TaskList }
