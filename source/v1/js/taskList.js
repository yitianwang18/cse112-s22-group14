import { Task } from "./task.js";

// variable for turning on/off console logs used for debugging
const B_CONSOLE_LOG = false;

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

        // background mask
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("sidenav-blocker", "hidden");
        o_wrapper_obj_back.id = "side-tasks-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeTaskList.bind(this));

        // actual sidebar
        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "sidenav";
        o_wrapper_obj.id = "side-tasks";

        // close button
        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close", "btn", "hidden");
        o_close_button.title = "Close Tasklist (esc)";
        o_close_button.id = "close-task";
        o_close_button.innerHTML = "&times;";
        // event to close the task list
        o_close_button.addEventListener("click", this.closeTaskList.bind(this));

        // wrapper for input/headers
        let o_task_title_wrapper = document.createElement("div");
        o_task_title_wrapper.id = "task-title";
        o_task_title_wrapper.classList.add("hidden")

        let o_tasklist_title = document.createElement("h1");
        o_tasklist_title.innerText = "Task List";

        let o_add_task = document.createElement("div");
        o_add_task.id = "add-task";

        // Add Tasks Header
        let o_add_label_container = document.createElement("div")

        let o_make_add_label_bold = document.createElement("strong");
        o_make_add_label_bold.innerHTML = "New Task:";

        o_add_label_container.append(o_make_add_label_bold);

        // add input field
        let o_add_task_input = document.createElement("input");
        o_add_task_input.id = "task-input-top";
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
        o_add_task_button.title = "Add Task"

        let o_add_task_icon = document.createElement("i");
        o_add_task_icon.classList.add("fas", "fa-plus-square", "fa-x");
        o_add_task_button.appendChild(o_add_task_icon);

        // error message for add button
        let o_error_mssg = document.createElement("span");
        o_error_mssg.id = "add-error";
        o_error_mssg.className = "error-mssg";

        o_wrap_btn.append(o_add_task_button, o_error_mssg);

        o_add_task_button.addEventListener("click", this.handleAddTask.bind(this));

        o_add_task.append(o_add_task_input, o_wrap_btn);

        let o_hr = document.createElement("hr");

        // Tasks remaining header
        let o_existing_tasks_title = document.createElement("div")

        let o_make_bold = document.createElement("strong");
        o_make_bold.innerHTML = "Tasks remaining:";

        o_existing_tasks_title.append(o_make_bold);

        let o_error_mssg_2 = document.createElement("span");
        o_error_mssg_2.id = "edit-error";
        o_error_mssg_2.className = "error-mssg";

        o_task_title_wrapper.append(o_close_button, o_tasklist_title, o_add_label_container, 
            o_add_task, o_hr, o_existing_tasks_title, o_error_mssg_2);

        let o_tasks = document.createElement("div");
        o_tasks.className = "hidden";
        o_tasks.id = "all-tasks";
        // handles reordering task items visually in HTML for desktop
        o_tasks.addEventListener('dragover', (event) => this.handleDrag(event));

        o_wrapper_obj.append(o_task_title_wrapper, o_tasks);
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
     * Handles setting the order of tasks (in HTML) after being dragged to 
     * desired spot
     * @param {Event} o_event window event that has occurred
     */
    handleDrag(o_event) {
        o_event.preventDefault();
        // y-coordinate is either from desktop or from mobile
        const n_y_coord = o_event.clientY != null ? o_event.clientY : o_event.targetTouches[0].pageY;
        // get task that is directly after the position of current task
        // that is being dragged
        const o_after_task = this.getDragAfterElement(n_y_coord); 
        // get current element being dragged
        const o_dragged_task = this.querySelector('task-item[dragging=""]');
        // ensure there is a dragged task
        if (o_dragged_task == null) {
            return;
        }
        // add appropriately to tasklist
        const o_tasks_container = this.querySelector('#all-tasks');
        // dragging task to end of list
        if (o_after_task == null) {
            o_tasks_container.appendChild(o_dragged_task);
        } 
        // dragging task to anywhere before the end of the list
        else {
            o_tasks_container.insertBefore(o_dragged_task, o_after_task);
        }
    }

    /**
     * Get the closest element to the current task being dragged, so we know 
     * where to insert dragged task at.
     * @param {number} n_y_coord y coordinate of current task being dragged
     * @returns closest task above the currently dragged task
     */
    getDragAfterElement(n_y_coord) {
        // get all tasks except the one that is dragging
        const o_undragged_tasks = [...this.querySelectorAll('task-item:not([dragging=""]')]
        return o_undragged_tasks.reduce((closest, curTask) => {
            const box = curTask.getBoundingClientRect();
            const offset = n_y_coord - box.top - box.height / 2;
            // if offset is negative, then must be below current element
            // trying to find the closest element, so also compare with current closest
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, task: curTask };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).task;
    }

    /**
     * Handles the input change event. Only used for disabling/enabling the task add button
     * @param {Event} o_event event instance
     */
    handleInputChange(o_event) {
        let o_add_btn = this.querySelector("#add-btn");
        let o_add_error = this.querySelector("#add-error");
        if (o_event == undefined || !TaskList.validateString(o_event.target.value)) {
            o_add_btn.disabled = true;
            o_add_error.innerHTML = TaskList.S_TASK_ERROR;
            o_add_error.classList.add("color-error");
        } else {
            o_add_btn.disabled = false;
            o_add_error.innerHTML = "";
            o_add_error.classList.remove("color-error");
        }
    }

    /**
     * Handles the Key-up event for task input. Only used for checking when enter is pressed
     * @param {Event} o_event event instance
     */
    handleKeyUpChange(o_event) {
        if (o_event.key == "Enter") {
            this.handleAddTask();
        } else if (o_event.key == "Escape") {
            this.querySelector("input").blur();
            this.closeTaskList();
        }
    }

    /**
     * Handles the event for adding a task. o_event should be useless as you don't care about 
     * the object that was clicked.
     * Validates the string, and if it's valid, it updates the data structure and adds a 
     * Task to the DOM
     */
    handleAddTask() {
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
     * @param {String} s_task_name name of the task
     */
    addItem(s_task_name) {
        let n_task_id = this.n_next_task_id++;
        this.o_tasks[n_task_id] = s_task_name;
        let o_task = new Task();
        o_task.setAttribute("taskname", s_task_name);
        o_task.setAttribute("taskid", n_task_id);
        o_task.bindHandleDelete(() => { this.removeItem(n_task_id); });
        // bind a function that listen to an onchange for a task input element
        o_task.bindHandleEdit(() => { this.editItemName(n_task_id); });
        o_task.bindHandleDragend(() => { this.setNewTaskOrder(o_task); });
        o_task.bindHandleTouchMove((e) => this.handleDrag(e));

        this.querySelector("#all-tasks").append(o_task);

        //add to local storage
        const o_add_button = this.querySelector("#add-btn");
        o_add_button.addEventListener('click', window.localStorage.setItem("current_tasks",
            JSON.stringify(this.o_tasks)));
    }

    /**
     * Enter 'edit task name' mode after clicking on existing task
     * @param {number} n_task_id task id number
     */
    editItemName(n_task_id) {
        // get the task object that we'll be editing the name of
        let o_task_item = this.querySelector(`#all-tasks task-item[taskid="${n_task_id}"]`);
        let o_task_item_input = o_task_item.querySelector("input");
        let s_curr_input_val = o_task_item.getAttribute("taskname");
        let o_error_span = this.querySelector("#edit-error");
        if (TaskList.validateString(o_task_item_input.value)) {
            o_task_item.setAttribute("taskname", o_task_item_input.value.trim());
            o_error_span.innerHTML = "";
            o_error_span.classList.remove("color-error");

            //update local storage
            if(window.localStorage.getItem("current_tasks") != null){
                this.o_tasks = window.localStorage.getItem("current_tasks");
                this.o_tasks = JSON.parse(this.o_tasks);
            }

            this.o_tasks[n_task_id] = o_task_item_input.value.trim();
            window.localStorage.setItem("current_tasks",JSON.stringify(this.o_tasks));
        }
        else {
            o_task_item.setAttribute("taskname", s_curr_input_val);
            o_error_span.innerHTML = TaskList.S_TASK_ERROR;
            o_error_span.classList.add("color-error");

            // Make error message disappear after 3 seconds
            setTimeout(() => {
                o_error_span.innerHTML = "";
                o_error_span.classList.remove("color-error");
            }, 3000);
        }
        // update array of tasks (o_tasks)
        this.o_tasks[n_task_id] = o_task_item.getAttribute("taskname");
    }

    /**
     * Removes a specific task from the task list(from dom and data structure)
     * @param {Number} n_task_id id of task to remove
     */
    removeItem(n_task_id) {
        //type string when passed from popTask()
        n_task_id = parseInt(n_task_id);

        if (this.o_tasks[n_task_id] == undefined) {
            return -1;
        }
        let item = this.o_tasks[n_task_id];

        delete this.o_tasks[n_task_id];

        // attribute query selector
        this.querySelector(`#all-tasks task-item[taskid="${n_task_id}"]`).remove();

        //remove from local storage
        let o_new_tasks = {};
        let n_task_num = this.getNumTasks();
        let i = 0;
        for(let j = 0; j < n_task_num; j++){
            if(i == n_task_id) break;
            o_new_tasks[j] = this.o_tasks[i++];
        }
        this.o_tasks = o_new_tasks;
        this.n_next_task_id = n_task_id;
        window.localStorage.setItem("current_tasks",JSON.stringify(this.o_tasks));

        //update task id
        let o_curr_item = {};
        let n_curr_id = n_task_id+1;
        while((o_curr_item = this.querySelector(`#all-tasks task-item[taskid="${n_curr_id}"]`))!= 
        null){
            this.querySelector(`#all-tasks task-item[taskid="${n_curr_id}"]`).remove();
            this.addItem(o_curr_item.getAttribute("taskname"));
            n_curr_id++;
        }

        return item;
    }

    /**
     * Once task is dropped, set the new order of tasks for both the o_tasks variable
     * and localStorage
     * @param {Object} o_task task HTML object to remove the dragging class from
     */
    setNewTaskOrder(o_task) {
        // remove dragging attribute on currently dragging object
        o_task.removeAttribute("dragging");
        if (B_CONSOLE_LOG) {
            console.log(o_task.children[0]);
        }
        // update this.o_tasks
        const n_num_tasks = this.getNumTasks();
        const o_task_items = document.getElementById('all-tasks').children;
        // make sure to update eventlisteners, taskid, and taskname
        for (let i = 0; i < n_num_tasks; i++) {
            const o_task_item = o_task_items[i]; 
            if (B_CONSOLE_LOG) {
                console.log(typeof(o_task_item));
            }
            // remove old event listeners and add new ones to new id
            o_task_item.unbindDelete();
            o_task_item.unbindEdit();
            o_task_item.bindHandleDelete(() => { this.removeItem(i); });
            o_task_item.bindHandleEdit(() => { this.editItemName(i); });
            o_task_item.setAttribute("taskid", `${i}`);
            this.o_tasks[i] = o_task_item.getAttribute("taskname");
        }
        // update localStorage
        if (B_CONSOLE_LOG) {
            console.log(this.o_tasks);
        }
        window.localStorage.setItem("current_tasks",JSON.stringify(this.o_tasks));
    }

    /**
     * Function to show task list display from the main user screen
     */
    showTaskList() {
        let o_tasks = this.querySelector("#side-tasks");
        o_tasks.style.display = "block";

        if (window.screen.width <= 500) {
            o_tasks.classList.add("sidenav-small");
        } else {
            o_tasks.classList.add("sidenav-open");
        }

        // Remove everything during animation to prevent sandwiching of text
        setTimeout(() => {
            this.querySelector("#close-task").style.display = "block";
            this.querySelector("#task-title").style.display = "block";
            this.querySelector("#all-tasks").style.display = "block";
            this.querySelector("input").focus();
        }, 300);

        this.querySelector("#side-tasks-blocker").style.display = "block";

        //load from local storage
        if((this.getNumTasks() == 0) & (window.localStorage.getItem("current_tasks")!=null)){
            this.o_tasks = window.localStorage.getItem("current_tasks");
            this.o_tasks = JSON.parse(this.o_tasks);
            let n_num_tasks = Object.keys(this.o_tasks).length;
            for(let i = 0; i < n_num_tasks; i++){
                if(this.o_tasks[i] != null){
                    let o_task = new Task();
                    o_task.setAttribute("taskname", this.o_tasks[i]);
                    o_task.setAttribute("taskid", i);
                    if (B_CONSOLE_LOG) {
                        console.log(this.n_task_id);
                    }
                    o_task.bindHandleDelete(() => { this.removeItem(i); });
                    // bind a function that listen to an onchange for a task input element
                    o_task.bindHandleEdit(() => { this.editItemName(i); });
                    o_task.bindHandleDragend(() => { this.setNewTaskOrder(o_task); })
                    o_task.bindHandleTouchMove((e) => this.handleDrag(e));
                    this.n_next_task_id++;
                    this.querySelector("#all-tasks").append(o_task);
                }
            }
        }
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeTaskList() {
        this.querySelector("#close-task").style.display = "none";
        let o_tasks = this.querySelector("#side-tasks");
        this.clearInput();

        o_tasks.classList.remove("sidenav-small");
        o_tasks.classList.remove("sidenav-open");
        this.querySelector("#task-title").style.display = "none";
        this.querySelector("#all-tasks").style.display = "none";
        this.querySelector("#side-tasks-blocker").style.display = "none";
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
TaskList.S_TASK_ERROR = "Input cannot be empty or be more than 50 chars long!";

customElements.define("task-list", TaskList);


export { TaskList }
