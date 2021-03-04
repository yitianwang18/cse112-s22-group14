/**
 * Custom Element representing a Task item
 * @extends HTMLElement
 */
class Task extends HTMLElement {

    /**
     * Maximum length of trimmed input task
     * @static
     * @type {Number}
     */
    static N_MAX_TASK_LENGTH = 50;

    /**
     * Attributes that this object observes
     * @static
     * @type {String[]}
     */
    static get observedAttributes() { return ['taskname', 'taskid']; }

    /**
     * Constructs a Task item, initializing the task name and delete button
     */
    constructor() {
        super();
        let o_div = document.createElement("div");
        let o_item = document.createElement("input");
        // let o_item_input = document.createElement("input");
        o_item.setAttribute('type', 'text');
        o_item.setAttribute('name', 'task');

        let o_del_button = document.createElement("button");
        o_del_button.classList.add("btn");
        let o_del_button_icon = document.createElement("i");
        o_del_button_icon.classList.add("fas", "fa-trash-alt", "fa-x");

        o_del_button.append(o_del_button_icon);

        o_div.append(o_item, o_del_button);
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
    attributeChangedCallback(name, oldValue, newValue) {
        this.renderComponents();
    }

    /**
     * Binds delete handler to the delete button. Must be done to access data from the Task list.
     * @param {Function} f_delete_action
     */
    bindHandleDelete(f_delete_action) {
        this.querySelector("button").addEventListener("click", f_delete_action);
    }

    /**
     * Binds edit handler to the task-item. Allows task name to be editable upon click
     * @param {Function}  edit_action
     */
    bindHandleEdit(f_edit_action) {
        // let text = this.querySelector("div").addEventListener("click", f_edit_action);
        // this.f_handle_edit = f_edit_action;
        this.querySelector("input").addEventListener("change", f_edit_action);
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
