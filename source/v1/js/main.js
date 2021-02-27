import { TimerContainer } from "./timerContainer.js";
import { TaskList } from "./taskList.js";
window.addEventListener("DOMContentLoaded", () => {
    // Code for Up arrow scroll-up functionality 
    const TIMER_SECTION_TARGET = ".timer-section";
    let up_arrow = document.getElementById("up-arrow");
    up_arrow.setAttribute("target", TIMER_SECTION_TARGET);
    up_arrow.addEventListener("click", handleUpBtnPressed.bind(this));

    /**
     * Event handler function for instruction section: when "up-arrow" button pressed
     * @param {Event} o_event The event instance
     */
    function handleUpBtnPressed(o_event) {
        let o_target = o_event.target.getAttribute("target");
        let n_offset = document.querySelector(o_target).offsetTop;

        scroll({ top: n_offset, behavior: "smooth" });
    }

    // Code for showing / hiding TaskList functionality
    let task_btn = document.getElementById("task-btn");
    task_btn.addEventListener("click", showTaskList); 

    /**
     * Event handler function to show TaskList when task button is pressed
     */
    function showTaskList() {
        let tasks = document.querySelector("task-list");
        tasks.showTaskList();
    }

});
