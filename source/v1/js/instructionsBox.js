
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
        o_wrapper_obj_back.classList.add("instructions-section-blocker", "hidden");
        o_wrapper_obj_back.id = "instructions-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeInstructions.bind(this));

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "instructions-section";
        o_wrapper_obj.id = "instructions";

        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close2", "btn");
        o_close_button.innerHTML = "&times;";
        o_close_button.addEventListener("click", this.closeInstructions.bind(this));

        let o_inst_title_wrapper = document.createElement("div");
        o_inst_title_wrapper.className = "hidden";
        o_inst_title_wrapper.id = "instructions-title";

        let o_inst_title = document.createElement("h2");
        o_inst_title.className = "instruct-head";
        o_inst_title.innerText = "Instructions";

        let o_inst_text = document.createElement("div");
        o_inst_text.className = "hidden";
        o_inst_text.id = "instructions-para";

        let o_inst_tasks = document.createElement("h3");
        o_inst_tasks.innerText = "Add tasks for the session";
        o_inst_tasks.className = "inst-headers";

        let o_inst_tasks_list = document.createElement("ul");
        o_inst_tasks_list.className = "inst-list";
        let o_tl1 = document.createElement("li");
        o_tl1.innerText = "Click on the task list button, add all tasks you want to do";
        let o_tl2 = document.createElement("li");
        o_tl2.innerText = "Tasks can only be added before starting the Pomodoro session";
        let o_tl3 = document.createElement("li");
        o_tl3.innerText = "Once the session begins, you can see the current and the next tasks";
        let o_tl4 = document.createElement("li");
        o_tl4.innerText = "If you are done with a task, hit the 'check' button next it";
        o_inst_tasks_list.append(o_tl1, o_tl2, o_tl3, o_tl4);

        let o_inst_cycle = document.createElement("h3");
        o_inst_cycle.innerText = "Work-Break Cycle";
        o_inst_cycle.className = "inst-headers";
    
        let o_inst_cycle_list = document.createElement("ul");
        o_inst_cycle_list.className = "inst-list";
        let o_cl1 = document.createElement("li");
        o_cl1.innerText = "One Pomodoro = 25 minutes of work/studying";
        let o_cl2 = document.createElement("li");
        o_cl2.innerText = "Once you start, the timer won’t stop until you finish!";
        let o_cl3 = document.createElement("li");
        o_cl3.innerText = "Take a 5-minute break after every Pomo and a 30-minute break after every 4 Pomos";
        let o_cl4 = document.createElement("li");
        o_cl4.innerText = "If you get distracted, click “Restart” to restart the current interval";
        let o_cl5 = document.createElement("li");
        o_cl5.innerText = "Have other things to do? Hit “End Session” to log out";
        o_inst_cycle_list.append(o_cl1, o_cl2, o_cl3, o_cl4, o_cl5);

        let o_inst_pomo = document.createElement("h3");
        o_inst_pomo.innerText = "The Pomodoro Technique";
        o_inst_pomo.className = "inst-headers";

        let o_inst_pomo_text = document.createElement("p");
        o_inst_pomo_text.innerText = "The Pomodoro technique is a scientifically proven way to help increase productivity. Ultimately, people are more productive by taking small mental breaks. PomoHero automates the process for you, making it easier for you to focus on your work and reduce distractions.";

        let o_inst_hot = document.createElement("h4");
        o_inst_hot.innerText = "Hotkeys:";
        o_inst_hot.className = "inst-hotkeys";

        let o_inst_hot_text = document.createElement("p");
        o_inst_hot_text.innerText = "c - color change, t - tasklist, esc - close pop-up, space - start/end session, n - next task";
        o_inst_hot_text.id = "inst-hotkeys-text";

        o_inst_title_wrapper.append(o_inst_title);
        o_inst_text.append(o_inst_tasks, o_inst_tasks_list, o_inst_cycle, o_inst_cycle_list, o_inst_pomo, o_inst_pomo_text, o_inst_hot, o_inst_hot_text);
        o_wrapper_obj.append(o_close_button, o_inst_title_wrapper, o_inst_text);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }


    /**
     * Function to show task list display from the main user screen
     */
    showInstructionsBox() {
        this.querySelector("#instructions").classList.add("instructions-section-open");

        // Hide everything inside instructions box while animating to prevent sandwiching of text
        setTimeout(() => {
          this.querySelector("#instructions-title").classList.toggle("hidden");
          this.querySelector("#instructions-para").classList.toggle("hidden");
        }, 200);

        this.querySelector("#instructions-blocker").classList.toggle("hidden");
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeInstructions() {
        this.querySelector("#instructions").classList.remove("instructions-section-open");
        this.querySelector("#instructions-title").classList.toggle("hidden");
        this.querySelector("#instructions-para").classList.toggle("hidden");
        this.querySelector("#instructions-blocker").classList.toggle("hidden");
    }
}

customElements.define("instructions-box", InstructionsBox);


export { InstructionsBox }