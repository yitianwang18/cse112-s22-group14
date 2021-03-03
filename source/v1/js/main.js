import { TimerContainer } from "./timerContainer.js";
import { TaskList } from "./taskList.js";
import { TaskDisplay } from "./taskDisplay.js";
document.addEventListener("DOMContentLoaded", () => {
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
    
    // Code for scrolling to instructions functionality 
    const S_INSTRUCTIONS_TARGET = ".instructions-section";
    let info_btn_new = document.getElementById("info-btn-new");
    info_btn_new.setAttribute("target", S_INSTRUCTIONS_TARGET);
    info_btn_new.addEventListener("click", handleInfoBtnPressed.bind(this));

    /**
     * Event handler function for when the "info" button is pressed
     * @param {Event} o_event The event instance
     */
    function handleInfoBtnPressed(o_event) {
        let o_target = o_event.target.getAttribute("target");
        let n_offset = document.querySelector(o_target).offsetTop;

        scroll({ top: n_offset, behavior: "smooth" });
    }

    // Code for change theme button functionality
    let theme_btn = document.getElementById("theme-btn");
    theme_btn.addEventListener("click", handleThemeBtnPressed);

    /**
     * Event handler function to change the theme
     */
    function handleThemeBtnPressed() {
        // Obtains an array of all <link> elements. Select your element using indexing. 
        let theme = document.getElementsByTagName('link')[1]; 

        // Change the value of href attribute to change the css sheet. 
        if (theme.getAttribute("href") == "./css/colors.css") { 
            theme.setAttribute("href", "./css/colors2.css"); 
        } else { 
            theme.setAttribute("href", "./css/colors.css"); 
        } 
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

