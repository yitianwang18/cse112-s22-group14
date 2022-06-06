
/**
 * Custom HTML element encapsulating all of the functionality related to the Intructions Box
 * @extends HTMLElement
 */
class InstructionsBox extends HTMLElement {

    /**
     * Constructs a new Instructions Box, initializing all elements
     */
    constructor() {
        super();
        // most of this content is simply initializing the html to go in the webcomponent
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("instructions-section-blocker", "hidden");
        o_wrapper_obj_back.id = "instructions-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeInstructions.bind(this));

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "instructions-section";
        o_wrapper_obj.id = "instructions";

        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close2", "btn");
        o_close_button.id = "close-inst";
        o_close_button.title = "Close Instructions (esc)";
        o_close_button.innerHTML = "&times;";
        o_close_button.addEventListener("click", this.closeInstructions.bind(this));

        let o_inst_title_wrapper = document.createElement("div");
        o_inst_title_wrapper.className = "hidden";
        o_inst_title_wrapper.id = "instructions-title";

        //Instructions Box header
        let o_inst_title = document.createElement("h2");
        o_inst_title.className = "instruct-head";
        o_inst_title.innerText = "Instructions";

        let o_inst_text = document.createElement("div");
        o_inst_text.className = "hidden";
        o_inst_text.id = "instructions-para";

        //header for task-list instructions
        let o_inst_tasks = document.createElement("h3");
        o_inst_tasks.innerText = "Add Tasks for the Session";
        o_inst_tasks.className = "inst-headers";

        let o_inst_tasks_list = document.createElement("ul");
        o_inst_tasks_list.className = "inst-list";
        let o_tl1 = document.createElement("li");
        o_tl1.innerText = InstructionsBox.A_TASK_INST[0];
        let o_tl1_icon = document.createElement("i");
        o_tl1_icon.classList.add("fas", "fa-tasks", "fa-x", "inline-icon");
        o_tl1.append(o_tl1_icon);
        let o_tl2 = document.createElement("li");
        o_tl2.innerText = InstructionsBox.A_TASK_INST[1];
        let o_tl3 = document.createElement("li");
        o_tl3.innerText = InstructionsBox.A_TASK_INST[2];
        //wrapper to hold text and icon
        let o_tl4 = document.createElement("li");
        o_tl4.innerText = InstructionsBox.A_TASK_INST[3];
        let o_tl4_icon = document.createElement("i");
        o_tl4_icon.classList.add("fas", "fa-check-circle", "fa-x", "inline-icon");
        o_tl4.append(o_tl4_icon);
        o_inst_tasks_list.append(o_tl1, o_tl2, o_tl3, o_tl4);

        //header for Work-Break cycle
        let o_inst_cycle = document.createElement("h3");
        o_inst_cycle.innerText = "Work-Break Cycle";
        o_inst_cycle.className = "inst-headers";
        let o_inst_cycle_list = document.createElement("ul");
        o_inst_cycle_list.className = "inst-list";
        let o_cl1 = document.createElement("li");
        o_cl1.innerText = InstructionsBox.A_CYCLE_INST[0];
        let o_cl1_icon = document.createElement("i");
        o_cl1_icon.classList.add("fas", "fa-cogs", "fa-x", "inline-icon");
        //append icon to the text
        o_cl1.append(o_cl1_icon);
        let o_cl2 = document.createElement("li");
        o_cl2.innerText = InstructionsBox.A_CYCLE_INST[1];
        let o_cl3 = document.createElement("li");
        o_cl3.innerText = InstructionsBox.A_CYCLE_INST[2];
        let o_cl4 = document.createElement("li");
        o_cl4.innerText = InstructionsBox.A_CYCLE_INST[3];
        let o_cl5 = document.createElement("li");
        o_cl5.innerText = InstructionsBox.A_CYCLE_INST[4];
        o_inst_cycle_list.append(o_cl1, o_cl2, o_cl3, o_cl4, o_cl5);

        //header for Pomodoro Technique overview
        let o_inst_pomo = document.createElement("h3");
        o_inst_pomo.innerText = "The Pomodoro Technique";
        o_inst_pomo.className = "inst-headers";

        
        //wrapper to hold text and link
        let o_inst_pomo_text = document.createElement("p");
        o_inst_pomo_text.innerText = InstructionsBox.S_POMO_INST;
        let o_inst_pomo_text_link = document.createElement("a");
        o_inst_pomo_text_link.setAttribute("href", 
            "https://todoist.com/productivity-methods/pomodoro-technique");
        o_inst_pomo_text_link.setAttribute("target", "_blank");
        o_inst_pomo_text_link.classList.add("inline-link");
        o_inst_pomo_text_link.innerHTML = "here!";
        o_inst_pomo_text_link.title = "Link to Pomodoro Technique";
        o_inst_pomo_text.append(o_inst_pomo_text_link);

        //header for hotkeys/shortcuts
        let o_inst_hot = document.createElement("h3");
        o_inst_hot.innerText = "Hotkeys:";
        o_inst_hot.className = "inst-headers";

        let o_inst_hot_text = document.createElement("p");
        o_inst_hot_text.innerText = InstructionsBox.S_HOTKEYS_INST;
        o_inst_hot_text.id = "inst-hotkeys-text";


        o_inst_title_wrapper.append(o_inst_title);
        o_inst_text.append(o_inst_tasks, o_inst_tasks_list, o_inst_cycle, o_inst_cycle_list, 
            o_inst_pomo, o_inst_pomo_text, o_inst_hot, o_inst_hot_text);
        o_wrapper_obj.append(o_close_button, o_inst_title_wrapper, o_inst_text);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }

    /** Function to determine if the instructions are currently shown */
    getIsShown() {
        return this.querySelector("#instructions").classList.contains("instructions-section-open");
    }

    /**
     * Function to show task list display from the main user screen
     */
    showInstructionsBox() {
        document.EventBus.pop_up = true;
        this.querySelector("#instructions").classList.add("instructions-section-open");
        this.querySelector("#close-inst").style.display = "none";

        // Hide everything inside instructions box while animating to prevent sandwiching of text
        setTimeout(() => {
            this.querySelector("#instructions-title").style.display = "block";
            this.querySelector("#instructions-para").style.display = "block";
            this.querySelector("#close-inst").style.display = "block";
            this.querySelector("#close-inst").style.position = "fixed";
            document.body.focus();
        }, 300);

        this.querySelector("#instructions-blocker").style.display = "block";
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeInstructions() {
        document.EventBus.pop_up = false;
        this.querySelector("#instructions").classList.remove("instructions-section-open");
        this.querySelector("#instructions-title").style.display = "none";
        this.querySelector("#instructions-para").style.display = "none";
        this.querySelector("#instructions-blocker").style.display = "none";
        this.querySelector("#close-inst").style.position = "absolute";
        this.querySelector("#close-inst").style.display = "none";
    }
}

/**
 * Array storing instructions related to the task-list
 * @static
 * @type {string[]}
 */
InstructionsBox.A_TASK_INST = ["First add all the tasks you want to work on by \
    clicking on the task list button ", "Tasks can only be added before starting \
    the work session to limit distractions while you work", "Once you start the \
    session, you can only see the current task!", "If you are done with a task, \
    hit the check next to it "];

/**
 * Array storing instructions related to the work-break cycle
 * @static
 * @type {string[]}
 */
InstructionsBox.A_CYCLE_INST = ["One work interval is 25 minutes of working or studying \
    — you can change the length in ", "Once you start, the timer can't be paused, so \
    keep working until your break!", "Take a short break after every work interval and \
    a long break after the 4th work interval", "Done working for now? Hit “End Session” \
    to stop. Your tasks will be saved!"];

/**
 * String describing the Pomodoro Technique
 * @static
 * @type {String}
 */
InstructionsBox.S_POMO_INST = "The Pomodoro technique is a scientifically proven way to help \
    increase productivity. Ultimately, people are more productive by taking small mental breaks. \
    Want to learn more? Click ";

/**
 * String describing the site's hotkeys
 * @static
 * @type {String}
 */
InstructionsBox.S_HOTKEYS_INST = "c - change theme, t - tasklist, s - settings,\
    i - instructions, esc - close pop-up, space - start/end session, n - next task";

customElements.define("instructions-box", InstructionsBox);


export { InstructionsBox }