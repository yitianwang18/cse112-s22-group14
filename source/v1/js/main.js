import { TimerContainer } from "./timerContainer.js";
import { TaskList } from "./taskList.js";
import { InstructionsBox } from "./instructionsBox.js";
import { EventBus } from "./eventBus.js";
import { TaskDisplay } from "./taskDisplay.js";
/**
 * Event handler function to change the theme
 */
function handleThemeBtnPressed() {
    // Obtains an array of all <link> elements. Select your element using indexing. 
    let theme = document.getElementById("theme");
    let theme_btn = document.getElementById("theme-btn");

    // Change the value of href attribute to change the css sheet.
    if (theme.getAttribute("href") == "./css/colors-dark.css") {
        theme.setAttribute("href", "./css/colors-forest.css");
        theme_btn.setAttribute("title", "Dark Theme");
    } else {
        theme.setAttribute("href", "./css/colors-dark.css");
        theme_btn.setAttribute("title", "Forest Theme");
    }
}

/**
 * Event handler function to show TaskList when task button is pressed
 */
function showTaskList() {
    document.EventBus.fireEvent("showTasks");
}

/**
 * Event handler function to show Instructions when info button is pressed
 * @param {Event} o_event event instance
 */
function showInstructions(o_event) {
    let inst = document.querySelector("instructions-box");
    inst.showInstructionsBox();

}

/**
 * Event handler function to handleKeybinds
 * @param {Event} o_event event instance
 */
function handleKeyBinds(o_event) {
    console.log(o_event);
    if (o_event.target.tagName != "INPUT") {
        switch (o_event.key) {
            case "c":
                handleThemeBtnPressed();
                break;
            case " ":
                document.EventBus.fireEvent("spaceKeybind");
                // disable space scrolling
                o_event.preventDefault();
                break;
            case "Escape":
                document.EventBus.fireEvent("closeWindows");
                break;
            case "t":
                document.EventBus.fireEvent("showTasks");
                // prevent event from bubbling into input
                o_event.preventDefault();
                break;
            case "n":
                document.EventBus.fireEvent("nextTask");
                break;
            case "r":
                document.EventBus.fireEvent("resetPomo");
                break;
        }
    }

}

/**
 * This event listener is used for initializing anything that isn't associated with any specific webcomponent.
 */
document.addEventListener("DOMContentLoaded", () => {

    // Code to automatically open instructions if it has been a month since the last time the website was used
    let a_daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let o_date = new Date();
    let n_currDate = o_date.getDay() + (o_date.getMonth() * a_daysInMonth[o_date.getMonth()]) + (o_date.getFullYear() * 365);
    let n_prevDate = localStorage.getItem("n_prevDate");

    if (n_prevDate == null || n_currDate - n_prevDate >= 30) {
        showInstructions();
    }
    localStorage.setItem("n_prevDate", n_currDate);

    // Code for change theme button functionality
    let o_theme_btn = document.getElementById("theme-btn");
    o_theme_btn.addEventListener("click", handleThemeBtnPressed);

    // Code for showing / hiding TaskList functionality
    let o_task_btn = document.getElementById("task-btn");
    o_task_btn.addEventListener("click", showTaskList);

    document.addEventListener("keydown", handleKeyBinds);

    // Code for showing / hiding Instructions functionality
    let o_info_btn = document.getElementById("info-btn-new");
    o_info_btn.addEventListener("click", showInstructions);

    // initialize Event Bus instance
    document.EventBus = new EventBus();

});

