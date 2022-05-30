
// variable for turning on/off console logs used for debugging
// const B_CONSOLE_LOG = false;

/**
 * Custom Element representing a Task item
 * @extends HTMLElement
 */
class Task extends HTMLElement {

    /**
     * Attributes that this object observes
     * @static
     * @type {String[]}
     */
    static get observedAttributes() { return ["taskname", "taskid"]; }

    /**
     * Constructs a Task item, initializing the task name and delete button
     */
    constructor() {
        super();

        // reference to these functions so we can remove the event listeners
        this.f_delete_action = null;
        this.f_edit_action = null;
        
        // set dragging class/attribute
        this.setAttribute("draggable", true);
        this.classList.add("draggable");
        // event listener to tell when this task is being dragged 
        let dragging = () => { this.classList.add('dragging') };
        this.addEventListener('dragstart', dragging);

        let o_div = document.createElement("div");
        o_div.id = "wrap-task";

        // MUST SET draggable attr and eventListeners on o_div to work on 
        // Safari; something weird with unable to set stuff directly on web components

        // set dragging class/attribute
        o_div.setAttribute("draggable", true);
        o_div.classList.add("draggable");
        // event listener to tell when this task is being dragged 
        this.addEventListener('dragstart', () => {
            this.setAttribute("dragging", "");
        });
        o_div.addEventListener('touchstart', () => {
            this.setAttribute("dragging", "");
        })
        let o_drag_icon = document.createElement("i");
        o_drag_icon.classList.add("fas", "fa-bars", "fa-x", "inert-btn");
        o_drag_icon.title = "Click and Drag to Reorder";
        let o_item = document.createElement("input");
        o_item.title = "Click to Edit";
        o_item.id = "task-input";
        // let o_item_input = document.createElement("input");
        o_item.setAttribute("type", "text");
        o_item.setAttribute("name", "task");

        let o_del_button = document.createElement("button");
        o_del_button.id = "delete-btn";
        o_del_button.title = "Delete Task";
        o_del_button.classList.add("btn");
        let o_del_button_icon = document.createElement("i");
        o_del_button_icon.classList.add("fas", "fa-trash-alt", "fa-x");

        o_del_button.append(o_del_button_icon);

        o_div.append(o_drag_icon, o_item, o_del_button);
        this.append(o_div);
    }

    /**
     * Static helper function to validate an input string with given parameters
     * @param {String} s_input string to validate
     */
    static validateString(s_input) {
        s_input = s_input.trim();
        if (s_input.length == 0 || s_input.length > Task.N_MAX_TASK_LENGTH) {
            return false;
        }
        return true;
    }

    /**
     * Renders the Task with given attributes
     */
    renderComponents() {
        let o_task_input = this.querySelector("input");
        o_task_input.value = this.getAttribute("taskname");
    }

    /**
     * Handler for when attributes are changed
     * @param {String} name name of changed attribute
     * @param {String} oldValue old value of attribute
     * @param {String} newValue new value of attribute
     */
    attributeChangedCallback() {
        this.renderComponents();
    }

    /**
     * Binds delete handler to the delete button. Must be done to access data from the Task list.
     * @param {Function} f_delete_action function that handles the delete action
     */
    bindHandleDelete(f_delete_action) {
        this.f_delete_action = f_delete_action;
        this.querySelector("button").addEventListener("click", this.f_delete_action);
    }

    /**
     * Unbinds delete handler from the delete button. Must be done when reordering
     * the tasks, because we change the id.
     */
    unbindDelete() {
        this.querySelector("button").removeEventListener("click", this.f_delete_action);
        this.f_delete_action = null;
    }

    /**
     * Binds edit handler to the task-item. Allows task name to be editable upon click
     * @param {Function}  edit_action function that handles the edit action
     */
    bindHandleEdit(f_edit_action) {
        this.f_edit_action = f_edit_action;
        this.querySelector("input").addEventListener("change", this.f_edit_action);
    }

    /**
     * Unbinds edit handler from the task-item. Must be done when reordering the 
     * tasks, because we change the id
     */
    unbindEdit() {
        this.querySelector("input").removeEventListener("change", this.f_edit_action);
        this.f_edit_action = null;
    }

    /**
     * Binds dragend handler to the task-item. Sets the new order of the task
     * within the task list
     * @param {Function}  f_dragend_action function that handles dragover
     */
    bindHandleDragend(f_dragend_action) {
        const o_div = this.querySelector("#wrap-task");
        this.addEventListener("dragend", f_dragend_action);
        o_div.addEventListener("touchend", f_dragend_action);
    }

    /**
     * Binds touchmove handler to the task-item. Enables drag and drop for 
     * touch-enabled devices, such as mobile. Needs a bind in order to 
     * differentiate scrolling and moving around tasks.
     * @param {Function} f_touchmove_action 
     */
    bindHandleTouchMove(f_touchmove_action) {
        const o_div = this.querySelector("#wrap-task");
        o_div.addEventListener('touchmove', f_touchmove_action);
    }

}
/**
 * Maximum length of trimmed input task
 * @static
 * @type {Number}
 */
Task.N_MAX_TASK_LENGTH = 50;
window.customElements.define("task-item", Task);
export { Task }
