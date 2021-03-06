import { TimerContainer } from "./timerContainer.js";
import { TaskList } from "./taskList.js";
import { EventBus } from "./eventBus.js";
import { TaskDisplay } from "./taskDisplay.js";
document.addEventListener("DOMContentLoaded", () => {
    
    // Code for scrolling to instructions functionality 
    const S_INSTRUCTIONS_TARGET = ".instructions-section";
    let info_btn_new = document.getElementById("info-btn-new");
    info_btn_new.setAttribute("target", S_INSTRUCTIONS_TARGET);
    info_btn_new.addEventListener("click", handleInfoBtnPressed);

    /**
     * Event handler function for when the "info" button is pressed
     */
    function handleInfoBtnPressed() {
        let o_target = document.getElementById("info-btn-new").getAttribute("target");
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
        let theme_btn = document.getElementById("theme-btn");

        // Change the value of href attribute to change the css sheet.
        if (theme.getAttribute("href") == "./css/colors.css") {
            theme.setAttribute("href", "./css/colors2.css");
            theme_btn.setAttribute("title", "Simple Theme");
        } else {
            theme.setAttribute("href", "./css/colors.css");
            theme_btn.setAttribute("title", "Complex Theme");
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

    document.EventBus = new EventBus();

});

