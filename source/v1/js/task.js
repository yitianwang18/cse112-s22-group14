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

        let o_del_button = document.createElement("button");
        o_del_button.innerText = "del";

        this.append(o_item, o_del_button);
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
}
window.customElements.define("task-item", Task);
export { Task }