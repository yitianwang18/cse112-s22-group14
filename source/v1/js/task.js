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
    static get observedAttributes() { return ['taskname', 'taskid']; }

    /**
     * Constructs a Task item, initializing the task name and delete button
     */
    constructor() {
        super();
        let o_item = document.createElement("div");
        // Enter edit mode for existing tasks in the task list
        o_item.addEventListener("click", () => {
            // small bug in this event handler, when u click on the edit box
            // multiple times, <input> fills the box up
            let stringVal = o_item.innerHTML;
            // hide the task name
            o_item.innerHTML = "";
            let input = document.createElement("input");
            input.onblur = function () {
                if (Task.validateString(input.value))
                    o_item.innerHTML = input.value;
                else
                    o_item.innerHTML = stringVal;

                input.value = "";
            }

            input.value = stringVal;
            o_item.appendChild(input);
            input.focus();
        });

        // when a task is clicked on, its name is also editable?
        // listener for taskname?
        let o_del_button = document.createElement("button");
        o_del_button.innerText = "del";

        this.append(o_item, o_del_button);
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
     * Renders the Task
     */
    renderComponents() {
        let o_div = this.querySelector("div");
        o_div.innerHTML = this.getAttribute("taskname");
    }

    /**
     * Handler for when attributes are changed
     * @param {String} name name of changed attribute
     * @param {*} oldValue old value of attribute
     * @param {*} newValue new value of attribute
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
    bindHandleEdit(edit_action) {
        // let item = this;
        // let stringVal = item.innerHTML;
        // let input = document.createElement("input");
        // input.onblur = function() {
        //   // check if input string same as current string value
        //   if (Task.validateString(input.value)) {
        //       item.innerHTML = input.value;
        //   }
        //   else {
        //     item.innerHTML = stringVal;
        //   }
        //   input.value = "";
        // }
        //
        // input.value = stringVal;
        // item.appendChild(input);
        // input.focus();
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
