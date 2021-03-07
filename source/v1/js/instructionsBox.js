
/**
 * Custom HTML element encapsulating all of the functionality related to the Task List
 * @extends HTMLElement
 */
class InstructionsBox extends HTMLElement {

    /**
     * Constructs a new Instructions Box, initializing all elements
     */
    constructor() {
        super();
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.className = "instructions-section-blocker";
        o_wrapper_obj_back.id = "instructions-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeInstructions.bind(this));

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "instructions-section";
        o_wrapper_obj.id = "instructions";

        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close", "btn");
        o_close_button.innerHTML = "&times;";
        o_close_button.addEventListener("click", this.closeInstructions.bind(this));

        let o_inst_title_wrapper = document.createElement("div");
        o_inst_title_wrapper.id = "instructions-title";


        let o_inst_title = document.createElement("h2");
        o_inst_title.className = "instruct-head";
        o_inst_title.innerText = "Instructions";

        let o_inst_text = document.createElement("div");
        o_inst_text.className = "instructions-para";

        let o_inst_tasks = document.createElement("h3");
        o_inst_tasks.innerText = "Add tasks for the session";

        let o_inst_cycle = document.createElement("h3");
        o_inst_cycle.innerText = "Work-Break Cycle";

        let o_inst_pomo = document.createElement("h3");
        o_inst_pomo.innerText = "The Pomodoro Technique";

        o_inst_title_wrapper.append(o_inst_title);
        o_inst_text.append(o_inst_tasks, o_inst_cycle, o_inst_pomo);
        o_wrapper_obj.append(o_close_button, o_inst_title_wrapper, o_inst_text);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }


    /**
     * Function to show task list display from the main user screen
     */
    showInstructionsBox() {
        let o_tasks = this.querySelector("#instructions");
        o_tasks.style.display = "block";
        let o_tasks_back = this.querySelector("#instructions-blocker");
        o_tasks_back.style.display = "block";
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeInstructions() {
        let o_tasks = this.querySelector("#instructions");
        o_tasks.style.display = "none";
        let o_tasks_back = this.querySelector("#instructions-blocker");
        o_tasks_back.style.display = "none";
    }



}

customElements.define("instructions-box", InstructionsBox);


export { InstructionsBox }