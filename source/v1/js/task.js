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
        o_del_button.id = "delete-btn";
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
     * Renders the Task
     */
    renderComponents() {
        let o_task_input = this.querySelector("input");
        o_task_input.value = this.getAttribute("taskname");
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
    bindHandleEdit(f_edit_action) {
        // let text = this.querySelector("div").addEventListener("click", f_edit_action);
        this.querySelector("input").addEventListener("change", f_edit_action);
    }

    /**
     * updates the taskname attrib after editing it
     * @param {number} n_task_id task id number
     */
    updateName(n_task_id) {
        // update the taskname attribute + input.value
        let o_task_item_input = this.querySelector('input');

        // save the old string value, perform str validation
        // if new string invalid, replace with old value
        let s_curr_input_val = this.getAttribute('taskname');

        if (Task.validateString(o_task_item_input.value)) {
          // set the attribute name to be the new value
          this.setAttribute('taskname', o_task_item_input.value.trim());
        }
        else {
            this.setAttribute('taskname', s_curr_input_val);
        }
    }

    /**
     * edits the task #n_task_id after clicking on it
     * @param {number} n_task_id task id number
     */
    // editName(n_task_id) {
        // let o_task_item = document.querySelector(`#all-tasks task-item[taskid='${n_task_id}']`);
        // let o_task_item_div = o_task_item.querySelector('div');
        // // keep the original taskname string incase new input invalid
        // let s_stringVal = o_task_item_div.innerHTML;
        //
        // // hide task name
        // o_task_item_div.innerHTML = "";
        // let o_input = document.createElement("input");
        // o_input.setAttribute('type', 'text');
        // o_input.onblur = function () {
        //   if (Task.validateString(o_input.value)) {
        //     o_input.value = o_input.value.trim();
        //     o_task_item_div.innerHTML = o_input.value;
        //   }
        //   else
        //     o_task_item_div.innerHTML = s_stringVal;
        //
        //   o_task_item.removeChild(o_input);
        // }
        // // input box should show existing name to edit
        // o_input.value = s_stringVal;
        // o_task_item.appendChild(o_input);
        // o_input.focus();
    // }
}

window.customElements.define("task-item", Task);
export { Task }
